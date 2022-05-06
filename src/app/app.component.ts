import { Component, OnInit } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { ETHEREUM_METHODS } from './application.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
/**
 * App Component
 */
export class AppComponent implements OnInit {
  public metaMask: any;
  public publicAddress: string;
  public chainId: string;
  public buttonDisabled: boolean;
  public ethMethods:{[key:string]:{[key:string]:string}| string}
  /**
   * constructor
   */
  constructor() {}
  /**
   * loaded initially
   */
  public async ngOnInit(): Promise<void> {
    this.metaMask = window['ethereum'];
    this.metaMask = await detectEthereumProvider();
    this.ethMethods=ETHEREUM_METHODS;
    // if (this.metaMask) {
    //   // From now on, this should always be true:
    //   // provider === window.ethereum
    //   this.onConnect(this.metaMask); // initialize your app
    // } else {
    //   console.log('Please install MetaMask!');
    // }
    // console.log(this.metaMask.isConnected());

    // this.metaMask
    //     .request({ method: 'eth_accounts' })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    this.metaMask.on('accountsChanged', function(accounts) {
      console.log(accounts);
      console.log('Your Account Changed to' + ':' + accounts);

      // Time to reload your interface with accounts[0]!
    });
    this.metaMask.on('chainChanged', function(chainId) {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // window.location.reload();
      console.log(chainId);
      console.log('Your Network Changed to' + ':' + chainId);
    });
  }
  /**
   * on connect
   * @param {any}provider
   */
  public onConnect(provider) {
    this.buttonDisabled = true;
    provider
        .request({ method: 'eth_requestAccounts' })
        .then((response) => {
          console.log(response[0]);
          this.publicAddress = response[0];
          this.buttonDisabled = true;
        })
        .catch((error) => {
          console.log(error);
          this.buttonDisabled = false;
        });
    this.metaMask
        .request({ method: 'eth_chainId' })
        .then((response) => {
          console.log(response);
          this.chainId = response;
        })
        .catch((error) => {
          console.log(error);
        });
  }
  /**
   * get network name
   */
  public getNetworkName() {
    console.log(this.metaMask);

    this.metaMask
        .request({ method: 'eth_getNetwork', params: this.chainId })
        .then((response) => {
          console.log(response);
          this.chainId = response;
        })
        .catch((error) => {
          console.log(error);
        });
  }
  /**
   * on disconnect
   */
  public onDisConnect() {
    console.log(this.metaMask.isConnected());
    this.publicAddress == undefined;
  }
  /**
   * on change account
   */
  public changeAccount() {
    this.metaMask
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3' }],
        })
        .then((response) => {
          console.log(response);
          this.chainId = response;
        })
        .catch((error) => {
          console.log(error);
        });
  }
}
