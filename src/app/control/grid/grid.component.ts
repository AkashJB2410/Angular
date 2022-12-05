import { AfterViewInit, Component, EventEmitter, ViewChild, Input, ChangeDetectorRef, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../checklist-component/services/event.service';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import * as XLSX from 'xlsx';
import { ToastService } from 'ng-uikit-pro-standard';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements AfterViewInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() Heading;
  @Input() dataFromComponent;
  @Input() coloums;
  @Input() isCheckbox = false;
  @Input() isAction = false;
  @Input() action = false;
  @Input() AcTion = false;
  @Input() filter = false;
  @Input() ExcelExport = false;
  @Input() isDropDown = false;
  @Input() isDateFilter = false;
  @Input() Img = false;
  @Input() isSearchBar = false;
  @Input() statusfromcomponent;
  @Input() istimesheetSearchBar = false
  @Output() onGridSelected = new EventEmitter<string>();
  @Input() timesheettask = false
  @Input() timesheetPRJ = false

  fileName = 'ExcelSheet.xlsx';
  displayedColumns;
  seletedchecklist;
  imagePath;
  imgURL;
  isSearchBox;
  departMent;
  departList;
  a = false;
  isDisabled: boolean = false;
  startStringvalue;
  endStringvalue
  start;
  end;
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private broad: Brodcaster,
    private http: HttpCallService,
    private cd: ChangeDetectorRef,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.GetDepartment();//this.broad.brodcast('refresh_grid', data.CheckList);
    this.broad.on('refresh_grid').subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res);
      this.cd.detectChanges();
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.dataFromComponent);
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = this.coloums;

    if (this.isAction) {
      this.coloums.push(' ');
    }
    if (this.action) {
      this.coloums.push('  ');
    }
    if (this.AcTion) {
      this.coloums.push('AcTion');
    }
    if (this.isCheckbox) {
      this.coloums.push('checkbox');
    }
    if (this.isSearchBox) {
      this.coloums.push('SearchBox');
    }

    if (this.statusfromcomponent != null) {
      this.doStatusFilter(this.statusfromcomponent);
    }
  }
  GetDepartment() {
    this.http.Department()
      .subscribe(data => this.departList = data.load_ItemLists)
  }
  public doFilter = (e: string) => {
    this.dataSource.filter = e.trim().toLocaleLowerCase();
  }

  onSelection(SelectedRow) {
    //this.broad.brodcast('onGridSelected', SelectedRow);
    this.onGridSelected.emit(SelectedRow);
  }

  onDelete(element) {
    this.broad.brodcast('onGridDelete', element);
  }
  onEdit(element) {
    this.broad.brodcast('onGridEdit', element);
  }
  onChkEdit(element) {
    this.broad.brodcast('onChecklistEdit', element);
  }
  onChkDelete(element) {
    this.broad.brodcast('onChecklistDelete', element);
  }
  onQueEdit(element) {
    this.broad.brodcast('onQueEdit', element);
  }
  onQueDelete(element) {
    this.broad.brodcast('onQueDelete', element);
  }
  onCopy(element) {
    this.broad.brodcast('onGridCopy', element);
  }
  onImageselect(SelectedRow) {
    this.broad.brodcast('onImageselect', SelectedRow);
  }

  onCheckboxClick(e, SelectedRow) {
    this.broad.brodcast('onCheckboxClick', SelectedRow);
    this.getCheck(SelectedRow);
  }

  onAllCheckboxClick(event) {
    this.a = event.target.checked
    this.broad.brodcast('onAllCheckboxClick', event.target.checked);

  }
  getCheck(row) {
    if (row.Status === 'Approved') {
      // this.isCheckbox = false;
      //this.isDisabled = true;
      // this.showError('Selected Checklist', 'Selected question was already approved!');

    }
    else if (row.Status === 'Rejected') {
      //this.isDisabled = true;
      this.showError('Selected Checklist', 'Selected question was already rejected!');
    }

  }
  getRowColor(row) {
    if (row.status === 'Submitted') {
      return "#ffe882 ";
    } else if (row.status === 'Approved') {
      return "lightgreen";
    }
    else if (row.status === 'Rejected') {
      return "#ff000080";
    }
    else if (row.status === 'Pending') {
      return "lightGray";
    }
  }
  public doStatusFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  startChange(e: MatDatepickerInputEvent<Date, Date>) {
    if (e && e.value) {
      this.start = e.value;
      this.startStringvalue = moment(this.start, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }
  }

  endChange(e: MatDatepickerInputEvent<Date, Date>) {
    if (e && e.value) {
      this.end = e.value;
      this.endStringvalue = moment(this.end, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }
    this.checkRange();
  }

  checkRange() {
    if (this.start != null && this.end != null) {
      let filterData = this.dataFromComponent.filter(m => {
        return m.CreatedDate >= this.startStringvalue && m.CreatedDate <= this.endStringvalue
      });
      this.dataSource = new MatTableDataSource<any>(filterData);
    } else {
      this.dataSource = new MatTableDataSource<any>(this.dataFromComponent);
    }
    this.dataSource.paginator = this.paginator;

  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

}