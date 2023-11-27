import { Component } from '@angular/core';
import { ShareService } from '../../share.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrl: './show-emp.component.css'
})
export class ShowEmpComponent {
  constructor(private service:ShareService) {}

  EmployeeList:any=[];
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  employee:any;

  ngOnInit():void {
    this.refreshEmployeeList();
  }
  addClick(){
    this.employee = 
    {
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png",
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item:any){
    this.employee = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure???'))
    {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{alert(data.toString());
      this.refreshEmployeeList();
      });
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmployeeList();
  }

  refreshEmployeeList(){
    this.service.getEmployeeList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }
}
