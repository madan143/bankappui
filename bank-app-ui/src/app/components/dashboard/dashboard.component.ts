import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillDetails } from "../../model/bill.model";
import { NgForm } from '@angular/forms';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model = new BillDetails();
  statusMsg : string;

  constructor(private dashboardService : DashboardService,
    private storageService: StorageService,
    private router : Router) {
      this.statusMsg = storageService.statusMsg;
    }

  ngOnInit(): void {
  }

  loadBillDetails(onlineBillForm: NgForm){
    this.statusMsg = "";
    this.storageService.resetStatusMsg();
    this.model.statusCd = '';
    let uniqueSerNum = this.model.uniqueServNum;
    this.dashboardService.getBillDetails(uniqueSerNum).subscribe(
      responseData => {
        if(responseData as any && (responseData as any).status){
          this.model.statusCd = (responseData as any).status;
        }else{
          if(responseData){
            console.log(responseData);
            this.model = responseData as BillDetails;
            this.storageService.updatePaymentAmt(this.model.totalAmt);
            this.storageService.updateUniqueSerNum(this.model.uniqueServNum);
          }
        }
      },error => {
        this.model = new BillDetails();
        this.model.uniqueServNum = uniqueSerNum;
        this.model.statusCd = '404';
      });
  }

  navigateToPayment(){
    this.router.navigate(['/payment']);
  }

}
