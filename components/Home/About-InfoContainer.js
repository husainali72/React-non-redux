import React from 'react'
import Info from './About-singleInfo'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import commonApiURL from '../../Provider/commonApiURL';
import io from 'socket.io-client'

/* dummyInfo = [{ name: 'Bitcoin1', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin2', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin3', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin4', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin5', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin6', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin7', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin8', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin9', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin10', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin11', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin12', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin13', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin14', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin15', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin16', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin17', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin18', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin19', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin20', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin21', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' },
{ name: 'Bitcoin22', price: '$117,193,515,285', price2: '$6,905.15', otherinfo: '16,971,900 BCT', percent: '0.92%' }] */

class InfoBox extends React.Component {
	constructor(props) {
		super(props)
		const now = Math.floor(Date.now()/1000);
		this.state = { 
			pageNum: 0, 
			bitcoinData: {} 
		};
		this.nextPage = this.nextPage.bind(this)
		this.prevPage = this.prevPage.bind(this)		
	}	

	nextPage() {
		this.setState((prevState) => {
			let newPageNum = (prevState.pageNum + 1) % Math.ceil(this.state.bitcoinData.length / 10)
			return { pageNum: newPageNum }
		})
	}

	prevPage() {
		this.setState((prevState) => {
			let newPageNum = ((prevState.pageNum - 1) === -1 ? Math.ceil(this.state.bitcoinData.length / 10) - 1 : (prevState.pageNum - 1)) % Math.ceil(this.state.bitcoinData.length / 10)
			return { pageNum: newPageNum }
		})
	}

	componentWillMount(){
		this.fetchHistoricalPrice();
	}

	componentWillUnmount(){

	}

	subscribeCryptoStream = () => {
		// Subscribe to CryptoCompare websocket API.
	
		let subs = []
		let cryptoIO = io.connect("https://streamer.cryptocompare.com/")
	
		Object.keys(this.state.bitcoinData).map((key) => {
		  subs.push("5~CCCAGG~"+ key +"~USD")
		  return null
		})
	
		cryptoIO.emit("SubAdd", { "subs": subs })
		cryptoIO.on("m", (message) => {
		  this.updateCoin(message)
		})
	  }
	
	  updateCoin = (message) => {
		// Update coin with recent data from CryptoCompare websocket API.
		
		message = message.split("~")
		let coins = Object.assign({}, this.state.bitcoinData)
		
		if ((message[4] === "1") || (message[4] === "2")) {
	
		  if (message[4] === "1") {
			coins[message[2]].priceClass = "color-green";
		  } else if (message[4] === "2") {
			coins[message[2]].priceClass = "color-red";
		  } else {
			coins[message[2]].priceClass = "";
		  }

		  coins[message[2]].price = message[5]
		  this.setState({ bitcoinData: coins })
	
		  /*
			Reset coin status after short interval. This is needed to reset
			css class of tick animation when coin's value goes up or down again.
		  */
		  setTimeout(() => {
			coins = Object.assign({}, this.state.bitcoinData)
			coins[message[2]].priceClass = ""
			this.setState({ bitcoinData: coins })
		  }, 2000)
	
		}
	}	

	fetchHistoricalPrice(){
		var CSCAr = [], CSCAr2 = [], count = 0;
		//XRP: { name: 'Ripple', price: 0.00, goUp: false, goDown: false},
		var bitcoinData = {
			BTC: { image: 'btc.png', name: 'Bitcoin', price: 0.00, goUp: false, goDown: false },
			ETH: { image: 'eth.png', name: 'Ethereum', price: 0.00, goUp: false, goDown: false },
			LTC: { image: 'ltc.png', name: 'Litecoin', price: 0.00, goUp: false, goDown: false },
			BCH: { image: 'bch.png', name: 'Bitcoin Cash', price: 0.00, goUp: false, goDown: false },			
			ETC: { image: 'etc.png', name: 'Ethereum Classic', price: 0.00, goUp: false, goDown: false},
			XMR: { image: 'xmr.png', name: 'Monero', price: 0.00, goUp: false, goDown: false },
			DASH: { image: 'dash.png', name: 'Dash', price: 0.00, goUp: false, goDown: false },
			ZEC: { image: 'zec.png', name: 'ZCash', price: 0.00, goUp: false, goDown: false },
			BCN: { image: 'bcn.png', name: 'ByteCoin', price: 0.00, goUp: false, goDown: false },
			DCR: { image: 'dcr.png', name: 'Decred', price: 0.00, goUp: false, goDown: false }
		}

		for(var i in bitcoinData){
			count++;
			if (count > 6){
				CSCAr2.push(i);
			} else {
				CSCAr.push(i);
			}
			
		}
		/* Due to limitation of CryptoCompare API, it only take 7 Coin in one time */
		var cryptShortCodeSlot1 = CSCAr.join(',');
		var cryptShortCodeSlot2 = CSCAr2.join(',');
		var apiURL = commonApiURL.getPriceHistorcalAPIURL();
		
		axios.get(apiURL + "?fsym=USD&tsyms=" + cryptShortCodeSlot1)
			.then((responseParent) => {
				axios.get(apiURL + "?fsym=USD&tsyms=" + cryptShortCodeSlot2)
					.then((response) => {				
						if (response.data || responseParent.data) {
							//let coins = Object.assign({}, this.state.bitcoinData)
							for (var i in responseParent.data.USD) {								
								bitcoinData[i].price = 1 / responseParent.data.USD[i];
							}
							for (var i in response.data.USD) {
								bitcoinData[i].price = 1 / response.data.USD[i];
							}
							this.setState({ bitcoinData: bitcoinData })
							this.batchIndex++;							
						}
						this.subscribeCryptoStream();
					})
			});
		
	}

	render() {
		{/*let filteredInfo = this.state.bitcoinData.slice(this.state.pageNum * 10, (this.state.pageNum) * 10 + 10),
			notFirstPage = this.state.pageNum > 0,
		notLastPage = this.state.pageNum < Math.ceil(this.state.bitcoinData.length / 10) - 1*/}
		return (
			<div id="infoContainer">
				<Row>
					{Object.keys(this.state.bitcoinData).map((key) => {
						  let info = this.state.bitcoinData[key]
						  return <Info key={key} info={info} />
					})}
					{/*{
						filteredInfo.map(info => {
							return <Info key={info.name} info={info} />
						})
					}
					{notFirstPage && <button type="submit" id="prev-btn" onClick={this.prevPage}>Previous 10</button>}
					{notLastPage && <button type="submit" id="next-btn" onClick={this.nextPage}>Next 10</button>}*/}
				</Row>
			</div>
		)
	}
}

// const mapState = state => {}
// export default connect(mapState)(About)

export default InfoBox
