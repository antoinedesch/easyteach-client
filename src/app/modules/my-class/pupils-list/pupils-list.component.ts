import {Component, OnInit, ViewChild} from '@angular/core';
import {PupilHttpService} from "../../../service/pupil-http.service";
import {Pupil} from "../../../models/pupil";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddPupilModalComponent} from "../../../components/modal/add-pupil-modal/add-pupil-modal.component";
import {
  ConfirmationModalComponent,
  ConfirmDialogModel
} from "../../../components/modal/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-my-class',
  templateUrl: './pupils-list.component.html',
  styleUrls: ['./pupils-list.component.scss']
})
export class PupilsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'surname', 'birthDate', 'actions'];
  dataSource: MatTableDataSource<Pupil>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private pupilHttpService: PupilHttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pupilHttpService.getAllPupils().subscribe((pupils) => {
      this.dataSource = new MatTableDataSource(pupils);
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  deletePupilConfirmation(id:number) {
    let index = this.dataSource.data.map(e => e.id).indexOf(id);
    let pupil = this.dataSource.data[index];
    const message = `Etes-vous sur de vouloir supprimer l'élève ${pupil.surname.toUpperCase()} ${pupil.firstName} ?`;
    const dialogData = new ConfirmDialogModel("Confirmation", message);

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.deletePupil(id,index);
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
