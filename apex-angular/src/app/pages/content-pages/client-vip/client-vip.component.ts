import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ClientVipService } from './client-vip.service';
import { NewClientModel } from './NewClientModel.model';
import { AuthService } from '../../../shared/auth/auth.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

declare var $: any;

@Component({
    selector: 'modal-content',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Erreur</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>La taille de l'image ne doit pas d\u00e9passer 10 Mo!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-raised" (click)="activeModal.close('Close click')">Ok</button>
    </div>
  `
})

export class NgbdModalImageSetting {

    constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-client-vip',
  templateUrl: './client-vip.component.html',
  styleUrls: ['./client-vip.component.css']
})
export class ClientVipComponent implements OnInit {

    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    @ViewChild('f') registerForm: NgForm;

  // Variable declaration
    client: NewClientModel;  
    clientDetails =[]; 
    loadSpinner: boolean = false;
    isAuthantified: string;
    isManager: boolean;
    oldClient: boolean = false;
    newClient: boolean = false;
    thanksNotif: boolean = false;
    invalidAccount: boolean = false;
    fileName: string = "Envoyer..";
    clientDetailsActive: boolean = false;
    
  constructor(private clientVipService: ClientVipService,private auth: AuthService, public toastr: ToastsManager, private modalService: NgbModal, private router: Router) { 
    
    this.isAuthantified = this.auth.getToken();
    this.isManager = this.auth.getIsManager();

  }

  ngOnInit() {
    
    var url = window.location.href;
    console.log(url);
    if(url.includes("/")) {
             console.log(url.split("/").pop());
        this.clientVipService.getClientInfo(url.split("/").pop()).subscribe(data => {
            if(data != null && data.id != null) {
                 console.log(data);
                 
                if(data.usedAccount == true){
                    this.clientDetailsActive = data.active;
                    if(data.hasPhoto == true){
                        
                        this.clientVipService.getProfilePicture(data.photoPath).subscribe(data1 => {
                                console.log(data1);
                                var blob = new Blob([data1.blob()], { type: data1._body.type });
                                let url = URL.createObjectURL(blob);
    
                                let reader = new FileReader();
                                reader.addEventListener("load", () => {
                                    let iframeContent = reader.result;
                                    let _iFrame;
                                    if (data1._body.type == "application/pdf") {
                                        _iFrame = document.createElement('embed');
                                    } else {
                                        _iFrame = document.createElement('img');
                                    }
                                    
                                    _iFrame.src = url;
                                     _iFrame.setAttribute('style', 'max-width:190px;max-height:190px');
                                    $('#userProfile').append(_iFrame);
                                });
                                reader.readAsDataURL(blob)
                            });
                    }
                    this.oldClient = true;
                    this.clientDetails = data;
                   
                }else if(data.usedAccount == false){
                    this.newClient = true;
                    this.client.id = data.id;
                }else{
                    this.invalidAccount =true   
                }
            }else{
                    this.invalidAccount =true   
            }
        });
    }
    


    this.client = new NewClientModel(0,"", "", "", "", 0, "");
    this.regularForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'phone': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'dp': new FormControl(null, [Validators.pattern("[0-9]{0-10}")])
        }, { updateOn: 'blur' });

 
    }


  addNewClient() {
       
        this.loadSpinner = false;
    
        if (this.client.firstName == null || this.client.firstName.trim() == null || this.client.firstName.trim() == "" || this.client.lastName == null || this.client.lastName.trim() == null || this.client.lastName.trim() == "") {
     
            if (this.client.firstName == null || this.client.firstName.trim() == null || this.client.firstName.trim() == "") {
                this.client.firstName = "";
            }
            if (this.client.lastName == null || this.client.lastName.trim() == null || this.client.lastName.trim() == "") {
                this.client.lastName = "";
            }
            this.toastr.error("Vous devez ajouter tous les champs requises");
            this.loadSpinner = false;
            
        } else if(!this.registerForm.valid){
            console.dir(this.registerForm.valid);
            this.toastr.error("Vous devez ajouter tous les champs requises");
        } else{
            this.clientVipService.addNewClient(this.client).subscribe(data => {
     
                this.registerForm.reset();
                if(data != null && data.id != null) {
                     this.clientDetailsActive = data.active;
                    if(data.usedAccount == true){
                        this.oldClient = true;
                        this.newClient = false;
                        this.clientDetails = data;
                        
                    }else if(data.usedAccount == false){
                        this.newClient = true;
                        this.client.id = data.id;
                    }
                    
                    if (this.fileUp2 != null) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const formData = new FormData();
                            const imgBlob = new Blob([reader.result], { type: this.fileUp2.type });
                            formData.append('file', imgBlob, this.fileUp2.name);
                            formData.append('useriD', data.id+"");
                            formData.append('fileName', this.fileUp2.name);
                            this.clientVipService.postData(formData).subscribe(data1 => {
                                console.log(data1);
                                var blob = new Blob([data1.blob()], { type: data1._body.type });
                                let url = URL.createObjectURL(blob);
    
                                let reader = new FileReader();
                                reader.addEventListener("load", () => {
                                    let iframeContent = reader.result;
                                    let _iFrame;
                                    if (data1._body.type == "application/pdf") {
                                        _iFrame = document.createElement('embed');
                                    } else {
                                        _iFrame = document.createElement('img');
                                    }
                                    
                                    _iFrame.src = url;
                                     _iFrame.setAttribute('style', 'max-width:190px;max-height:190px');
                                    $('#userProfile').append(_iFrame);
                                });
                                reader.readAsDataURL(blob);
                                this.clientDetails["hasPhoto"] = true;
                            });
                        };
                        reader.readAsArrayBuffer(this.fileUp2);
                    }
            
                     alertFunctions.typeSuccess();
                    
                    
                }
            });
            
        }
        
  }


    confirmClientVIP() {
        this.clientVipService.confirmClientVIP(this.clientDetails["id"]).subscribe(data => {

                this.thanksNotif = true;
                this.oldClient = false;
                this.newClient = false;
            });
    }
    
    fileUp2: any;
    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            if (file && file.size > 10000000) {
                const modalRef = this.modalService.open(NgbdModalImageSetting);
            } else {
                reader.readAsDataURL(file);
                this.fileUp2 = file;
                this.fileName = file.name;
            }

        }
    }

    QtyPlus() {
        this.client.numberAuto = this.client.numberAuto + 1;
    }
    QtyMinus() {
        if (this.client.numberAuto > 0) {
            this.client.numberAuto = this.client.numberAuto - 1;
        }

    }    


    logout() {
        localStorage.setItem('isManager', 'false');
        localStorage.setItem('loged', 'false');
        this.router.navigate(['pages/login']);
    }
}
