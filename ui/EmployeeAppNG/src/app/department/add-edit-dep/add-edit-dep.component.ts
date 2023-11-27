import { Component, Input } from '@angular/core';
import { ShareService } from '../../share.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrl: './add-edit-dep.component.css'
})
export class AddEditDepComponent {
  constructor(private service:ShareService){}

  @Input() department:any;
  DepartmentId?:string;
  DepartmentName?:string;

  ngOnInit():void
  {
    this.DepartmentId=this.department.DepartmentId;
    this.DepartmentName=this.department.DepartmentName;
  }

  addDepartment()
  {
    var val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this.service.addDepartment(val).subscribe(result=>{alert(result.toString())});
  }

  updateDepartment()
  {
    var val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this.service.updateDepartment(val).subscribe(result=>{alert(result.toString())});
  }
}
