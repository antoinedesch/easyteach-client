import {Component, OnInit, ViewChild} from '@angular/core';
import {PupilHttpServiceService} from "../../../service/pupil-http-service.service";
import {Pupil} from "../../../models/pupil";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddPupilModalComponent} from "../../../components/modal/add-pupil-modal/add-pupil-modal.component";

@Component({
  selector: 'app-my-class',
  templateUrl: './pupils-list.component.html',
  styleUrls: ['./pupils-list.component.scss']
})
export class PupilsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'surname', 'birthDate', 'actions'];
  dataSource: MatTableDataSource<Pupil>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pupilHttpService: PupilHttpServiceService, public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(AddPupilModalComponent, {
      width: '30%',
      data: new Pupil()
    });

    dialogRef.afterClosed().subscribe(pupil => {
      if (pupil) {
        this.pupilHttpService.createPupil(pupil).subscribe(pupil => {
          this.dataSource.data.push(pupil);
          this.dataSource._updateChangeSubscription()
        })
      }
    });
  }

  deletePupil(id:number, index:number) {
    this.pupilHttpService.deletePupil(id).subscribe(() =>{
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    })

  }
}
