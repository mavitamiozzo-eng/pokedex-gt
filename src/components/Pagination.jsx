function Pagination({ 
  page, // pagina atual
  totalPages, // total de paginas
  onPrevious, // função para ir para a pagina anterior
  onNext, // função para ir para a proxima pagina
  onPageChange // mudança de pagina
}) {

  const pages = Array.from(
    {length: totalPages}, // tamanho com o total de pgs
    // função anonima (underline)
    (_, index) => index // index (pagina) atual
  )

  return (
    <nav className="pagination" aria-label="Paginação">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 0}
      >
        Anterior
      </button>

      {/* <span>
        Página {page + 1} de {totalPages}
      </span> */}

      <div className="pagination-pages">
        {
          pages.map(pageNumber => [
            <button
              type="button"
              key={pageNumber}
              className={page === pageNumber ? 'active' : ''}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber + 1}  
            </button>
          ])
        }
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={page + 1 >= totalPages}
      >
        Próxima
      </button>
    </nav>
  )
}

export default Pagination
