import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() perPageToShow: number;
  @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(): void {
    this.goNext.emit(true);
  }

  onPage(pageNumber: number): void {
    this.goPage.emit(pageNumber);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  /// <summary>
  /// Determine if the user is on the last page.
  /// </summary>
  /// <returns>The boolean.</returns>
  isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }
}
