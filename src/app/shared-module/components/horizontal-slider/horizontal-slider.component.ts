import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-horizontal-slider",
  templateUrl: "./horizontal-slider.component.html",
  styleUrls: ["./horizontal-slider.component.scss"],
  inputs: ["leftOffset", "min", "max"],
  outputs: ["valueChangeEvents: valueChange"],
  host: {
    "[title]": "leftOffset"
  },
  queries: {
    trackRef: new ViewChild("trackRef")
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalSliderComponent {
  public max!: number;
  public min!: number;
  public trackRef!: ElementRef;
  public leftOffset!: number;
  public valueChangeEvents = new EventEmitter<number>();

  constructor() {}

  public startDrag(event: MouseEvent): void {
    event.preventDefault();

    var trackRect = this.trackRef.nativeElement.getBoundingClientRect();
    var minClientX = Math.floor(trackRect.left);
    var maxClientX = Math.floor(trackRect.right);
    var clientX = event.clientX;

    var handleMousemove = (event: MouseEvent) => {
      var nextClientX = Math.floor(event.clientX);
      nextClientX = Math.max(nextClientX, minClientX);
      nextClientX = Math.min(nextClientX, maxClientX);

      var percentClientX =
        (nextClientX - minClientX) / (maxClientX - minClientX);

      var nextValue = Math.round(
        (this.max - this.min + 1) * percentClientX + this.min
      );
      nextValue = Math.max(nextValue, this.min);
      nextValue = Math.min(nextValue, this.max);
      
      const roundedControlValue = Math.round(nextValue);

      this.valueChangeEvents.emit(roundedControlValue);
    };

    var handleMouseup = () => {
      window.removeEventListener("mousemove", handleMousemove);
      window.removeEventListener("mouseup", handleMouseup);
    };

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }
}
