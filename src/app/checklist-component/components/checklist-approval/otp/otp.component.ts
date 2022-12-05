import { Component, Input, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../services/http-call.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class otpComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('OTPModal') public OTPModal: ModalDirective;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  @Input() QueAnsData;
  @Input() subCheckLits;
  @Output() otpResult = new EventEmitter<string>();

  MobileNo;
  AppOTP;
  Inputotp;
  OTPmsg: boolean = false;
  click: boolean = false;
  getOtp = true;
  timeLeft: number = 60;
  interval: any;

  constructor(private http: HttpCallService,
    private toast: ToastService) { }

  ngOnInit(): void {
  }

  GetOTPFromUser() {
    this.MobileNo = this.QueAnsData.ContactNo;
    // this.http.GetOTP(this.MobileNo)
    this.http.GetOTP("9561127729")
      .subscribe(data => {
        this.AppOTP = data.otp;
        this.showInfo("An OTP has been sent to ", this.MobileNo);
        this.getOtp = false;
        this.startTimer();
      });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.timeLeft = 60;
        this.getOtp = true;
      }
    }, 1000)
  }
  onOtpChange(otp) {
    this.Inputotp = otp;
    this.click = !this.click;
  }

  OTPVerification() {
    if (this.Inputotp == undefined) {
      this.showError("Error Message", 'Please enter OTP');
    } else {
      if (this.Inputotp == this.AppOTP) {
        this.ngOtpInput.otpForm.reset();
        this.otpResult.emit("true");
      }
      else {
        this.showError("Error Message", 'Invalid OTP');
      }
    }
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }
  showInfo(b, a) {
    const options = { opacity: 1 };
    this.toast.info(a, b, options);
  }


}