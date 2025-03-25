import { MatPaginatorIntl } from '@angular/material/paginator';

export class PtBrMatPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página:';
  override nextPageLabel     = 'Próximo';
  override previousPageLabel = 'Anterior';
  override firstPageLabel    = 'Primeira Página';
  override lastPageLabel     = 'Última Página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length}`;
  };
}