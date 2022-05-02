import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blockchain-start';
  metaMask:any;
  publicAddress:any;
  chainId:string;
  constructor(){}
  ngOnInit(): void {
      console.log(window['ethereum']);
    this.metaMask=window['ethereum'];

      this.metaMask.request({method: 'eth_accounts'}).then((response)=>{
        console.log(response);
      //   this.publicAddress=response[0];
      //         this.metaMask.on('accountsChanged', (this.publicAddress) => {


      //   // Handle the new accounts, or lack thereof.
      //   // "accounts" will always be an array, but it can be empty.
      // });

      }).catch((error) => {
        console.log(error);

      })
      // this.getNetworkName();

      // if(this.chainId){

      //   this.metaMask.on('chainChanged', (this.chainId) => {
      //     // Handle the new chain.
      //     // Correctly handling chain changes can be complicated.
      //     // We recommend reloading the page unless you have good reason not to.
      //     window.location.reload();
      //   });
      // }

  }
  onConnect(){
    this.metaMask.request({ method : 'eth_requestAccounts' }).then((response)=>{
      console.log(response[0]);
      this.publicAddress=response[0];


    }).catch((error) => {
      console.log(error);

    })
    this.metaMask.request({ method : 'eth_chainId' }).then((response)=>{
      console.log(response);
      this.chainId=response;


    }).catch((error) => {
      console.log(error);

    })
  }
  getNetworkName(){
    console.log(this.metaMask);

    this.metaMask.request({ method : 'eth_getNetwork',params:this.chainId }).then((response)=>{
      console.log(response);
      this.chainId=response;


    }).catch((error) => {
      console.log(error);

    })
  }
}
