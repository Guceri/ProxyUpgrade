import React, { Component } from "react";
import Web3 from 'web3';
import eth from './eth.png';
import './App.css';


class App extends Component {

  async componentDidMount() {
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum) 
      
    }else {
      window.alert('Please install MetaMask')
      window.location.assign("https://metamask.io/")
    }

    const web3 = window.web3
    
    //make metaMask pop up to log into
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); 
    const account = await accounts[0]
    this.setState({ account })  

    const networkId = await window.ethereum.request({ method: 'net_version' })
    const networkName = this.networkNames[networkId]
    this.setState({ networkName }) 

    /*
    INSERT INSTANCE OF CONTRACTS HERE
    const MYTokenData = MyToken.networks[networkId]
    if(MyTokenData) {
      const MyToken = new web3.eth.Contract(MyToken.abi, MyTokenData.address)
      this.setState({ MyToken })
    } else {
      window.alert('MyToken contract not deployed to detected network.')
    }
    */
   
    //refresh page on network change event
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    //refresh user account on account change event
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      const account = await accounts[0]
      if(typeof account !== 'undefined'){
        this.setState({ account })
      } else {
        //make metaMask pop up to log into
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        this.setState({ account })
      }
    })

    this.setState({ loading: false })

  }

  networkNames = {
    1: 'Mainnet',
    3: 'Ropsten',
    42: 'Kovan',
    4: 'Rinkeby',
    5: 'Goerli',
    5777: 'Ganache'
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      networkName: '',
      loading: true
    }
  }

  render() {
    if(this.state.loading){
      return (
        <div className="App">
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={eth} alt="logo"/> 
          <p>
            Blockchain Development On: {this.state.networkName}
          </p>
          <a
            className="App-link"
            href={this.state.networkName === 'Mainnet' ? 
              `https://etherscan.io/address/${this.state.account}`: 
              `https://${this.state.networkName}.etherscan.io/address/${this.state.account}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
           {this.state.account}
          </a>
          
        </header>
      </div>
    );
  }
}

export default App;
