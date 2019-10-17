import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'de-washers',
    template: ` 
        <div #root></div>
    `,
    styleUrls: ['./washers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WashersComponent implements OnInit {
    
    @ViewChild('root', {static: true}) rootDiv: ElementRef<HTMLDivElement>;

    constructor() { }

    ngOnInit(): void {
        this.rootDiv.nativeElement.appendChild(document.createElement('de-washers'));
    }
}
