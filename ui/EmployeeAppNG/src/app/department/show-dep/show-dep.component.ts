import { Component } from '@angular/core';
import { ShareService } from '../../share.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrl: './show-dep.component.css'
})
export class ShowDepComponent {
  constructor(private service:ShareService) {}

  DepartmentList:any=[];
  ModalTitle:string="";
  ActivateAddEditDepComp:boolean=false;
  department:any;

  ngOnInit():void {
    this.refreshDepartmentList();
  }
  addClick(){
    this.department = 
    {
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;

  }

  editClick(item:any){
    this.department = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure???'))
    {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{alert(data.toString());
      this.refreshDepartmentList();
      });
    }
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepartmentList();
  }

  refreshDepartmentList(){
    this.service.getDepartmentList().subscribe(data=>{
      this.DepartmentList=data;
    });
  }
}
