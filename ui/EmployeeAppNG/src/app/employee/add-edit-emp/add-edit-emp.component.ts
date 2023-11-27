import { Component, Input } from '@angular/core';
import { ShareService } from '../../share.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrl: './add-edit-emp.component.css'
})
export class AddEditEmpComponent {
  constructor(private service:ShareService){}

  @Input() employee:any;
  EmployeeId?:string;
  EmployeeName?:string;
  Department?:string;
  DateOfJoining?:string;
  PhotoFileName?:string;
  PhotoFilePath?:string;

  DepartmentsList:any=[];

  ngOnInit():void
  {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;

      this.EmployeeId = this.employee.EmployeeId;
      this.EmployeeName = this.employee.EmployeeName;
      this.Department = this.employee.Department;
      this.DateOfJoining = this.employee.DateOfJoining;
      this.PhotoFileName = this.employee.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName;

    });
  }

  addEmployee()
  {
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };
    this.service.addEmployee(val).subscribe(result=>{alert(result.toString())});
  }

  updateEmployee()
  {
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };
    this.service.updateEmployee(val).subscribe(result=>{alert(result.toString())});
  }

  uploadPhoto(event:any)
  {
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }
}
