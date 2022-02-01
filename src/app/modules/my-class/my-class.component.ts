import {Component, OnInit, ViewChild} from '@angular/core';
import {PupilHttpServiceService} from "../../service/pupil-http-service.service";
import {Pupil} from "../../models/pupil";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.scss']
})
export class MyClassComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'surname','birthDate','actions'];
  dataSource: MatTableDataSource<Pupil>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pupils: Pupil[];

  constructor(private pupilHttpService: PupilHttpServiceService) {
  }

  ngOnInit(): void {
    this.pupilHttpService.getAllPupils().subscribe((pupils) => {
      this.dataSource = new MatTableDataSource(pupils);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addPupil() {

  }

  goToPupilFile(row: Pupil) {
    
  }
}
