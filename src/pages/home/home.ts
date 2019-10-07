import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BoardProvider } from '../../providers/board/board';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('searchBar') searchbar;
  showSearchbar: boolean = false;

  //List of all boards, initialized at startup
  allBoards: Array<Board>;

  //List of shown boards, might be filtered by searchterm
  shownBoards: Array<Board>;

  constructor(public navCtrl: NavController,
    private boardProvider: BoardProvider) {

  }

  ionViewDidLoad() {
    this.initializeBoards();
  }

  goToOrder(board?: Board) {
    this.navCtrl.push(OrderPage, board);
  }

  initializeBoards() {
    this.boardProvider.getBoards().subscribe((data) => {
      if (data) {
        this.allBoards = data.objects;
        this.shownBoards = this.allBoards;
      }
    });
  }

  resetBoards() {
    this.shownBoards = this.allBoards;
  }

  toggleSearchbar(event): void {
    this.showSearchbar = !this.showSearchbar;
    if (this.showSearchbar) {
      //Set the focus on the searchbar to show the cancel icon right away
      setTimeout(() => {
        //Wait until this.searchbar is defined, as it was hidden via ngIf
        this.searchbar.setFocus();
      });
    }
  }

  search(event: any) {
    // Reset boards back to all of the items
    this.resetBoards();

    // set searchTerm to the value of the searchbar
    let searchTerm = event.target.value;

    // if the value is an empty string don't filter the boards
    if (searchTerm && searchTerm.trim() != '' && this.shownBoards) {
      this.shownBoards = this.shownBoards.filter((board) => {
        return (board.Material.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }

  }


}
