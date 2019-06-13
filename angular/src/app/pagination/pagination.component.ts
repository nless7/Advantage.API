import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { getNumberOfCurrencyDigits } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
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

  /// <summary>
  /// Pagination handle when selecting a page on the data table.
  /// </summary>
  getPages(): number[] {
    const totalPages = Math.ceil(this.count / this.perPage);
    const thisPage = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];

    pages.push(thisPage);

    console.log(`Starting loop with: total pages: ${totalPages} thisPage: ${thisPage} pagesToShow: ${pagesToShow}`);

    for (var i = 0; i < pagesToShow - 1; i++) {
      console.log(`pages[]: ${pages}`);

      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
          console.log(`pushing: ${pages.push(Math.min.apply(null, pages) - 1)} into array`);
        }
      }

      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
          console.log(`pushing: ${pages.push(Math.max.apply(null, pages) + 1)} into array`);
        }
      }
    }

    pages.sort((a, b) => a - b);

    return pages;
  }

  /// <summary>
  /// Calculates the minimum page number for the pagination.
  /// </summary>
  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  /// <summary>
  /// Calculates the maximum page number for the pagination.
  /// </summary>
  getMax() {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }
}
