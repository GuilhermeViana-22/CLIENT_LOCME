import Swal from "sweetalert2";

export const showFancyLoading = function () {
    Swal.fire({
        title: '<strong>Processando...</strong>',
        html: `
      <div class="text-center space-y-4">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p class="text-gray-600">Estamos trabalhando na sua solicitação</p>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-600 h-2.5 rounded-full swal-progress-bar" style="width: 0%"></div>
        </div>
      </div>
    `,
        background: 'rgba(255,255,255,0.9)',
        backdrop: `
      rgba(0,0,0,0.5)
      url("/images/loading-bg.gif")
      center top
      no-repeat
    `,
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
            // Animação de progresso (opcional)
            const interval = setInterval(() => {
                const bar = document.querySelector('.swal-progress-bar');
                if (bar) {
                    const width = parseInt(bar.style.width) || 0;
                    if (width < 90) {
                        bar.style.width = (width + 10) + '%';
                    }
                }
            }, 500);

            Swal.getPopup().setAttribute('data-interval', interval);
        },
        willClose: () => {
            clearInterval(Swal.getPopup().getAttribute('data-interval'));
        }
    });
}

// Para fechar
export function hideLoading() {
    Swal.close();
}