import { CanDeactivateFn } from '@angular/router';

export interface CanExit {
  hasChanges: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanExit> =
  (component) => {
    return component.hasChanges()
      ? confirm('Descartar alterações?')
      : true;
  };
