import { Action } from "../ActionEvent";
import { AddInfoComponent as AddComponent } from "./add/add-info.component";
import { DeleteComponent } from "./delete/delete.component";

export namespace Dialog {
  export function type(dialog: Action) {
    switch (dialog) {
      case Action.ADD:
        return AddComponent;
      case Action.DELETE:
        return DeleteComponent;
    }
  }
}

export interface DialogContent {}
