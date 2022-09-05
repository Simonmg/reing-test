import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  ViewContainerRef, 
  NgZone, 
  TemplateRef, 
  OnChanges, 
  SimpleChanges 
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from "@angular/forms";
import {debounceTime} from 'rxjs';
import Popper from 'popper.js';

@UntilDestroy()
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options: Record<string, any>[] = [];
  @Input() model: any;
  @Input() optionTpl: any;
  @Input() isSearch: boolean = false;

  @Output() selectChange = new EventEmitter();
  @Output() closed = new EventEmitter();

  searchControl = new FormControl();
  
  originalOptions: Record<string, any>[] = [];

  view: any;
  popperRef: any;

  isOpen: boolean = false;
  visibleOptions = 4;

  constructor(private vcr: ViewContainerRef, private zone: NgZone) { }

  open(dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
  this.isOpen = true;
   this.view = this.vcr.createEmbeddedView(dropdownTpl);
   const dropdown = this.view.rootNodes[0];

   document.body.appendChild(dropdown);
   dropdown.style.width = `${origin.offsetWidth}px`;

   this.zone.runOutsideAngular(() => {
     this.popperRef = new Popper(origin, dropdown, {
       removeOnDestroy: true
     });
   });
 }

 close() {
    this.isOpen = false;
    this.closed.emit();
    this.popperRef.destroy();
    this.view.destroy();
    // this.searchControl.patchValue('');
    this.view = null;
    this.popperRef = null;
  }

  ngOnChanges({ options }: SimpleChanges): void {
    this.options = options?.currentValue;
  }

  ngOnInit(): void {
    this.originalOptions  = [...this.options];
    if (this.model !== undefined) {
      this.model = this.options.find(
        currentOption => currentOption[this.idKey] === this.model
      );
    }

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe( term => this.search(term));
  }

  search(value: string) {
    this.options = this.originalOptions.filter(
      (option: Record<string, any>) => option[this.labelKey].includes(value)
    );
  }

  select(option: any) {
    this.model = option;
    this.selectChange.emit(option);
    this.close();
  }

  isActive(option: any) {
    if (!this.model) {
      return false;
    }

    return option[this.idKey] === this.model[this.idKey];
  }

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select...';
  }

}
