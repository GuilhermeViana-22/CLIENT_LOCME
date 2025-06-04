export const formatDateTime = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

export const timeAgo = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000)
  
  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return `${interval} ano${interval === 1 ? '' : 's'} atrás`
  
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return `${interval} mês${interval === 1 ? '' : 'es'} atrás`
  
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return `${interval} dia${interval === 1 ? '' : 's'} atrás`
  
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return `${interval} hora${interval === 1 ? '' : 's'} atrás`
  
  interval = Math.floor(seconds / 60)
  if (interval >= 1) return `${interval} minuto${interval === 1 ? '' : 's'} atrás`
  
  return `${Math.floor(seconds)} segundo${seconds === 1 ? '' : 's'} atrás`
}

export const getStatusText = (status) => {
  switch (status) {
    case 'success': return 'Sucesso'
    case 'failed': return 'Falha'
    case 'pending': return 'Pendente'
    default: return status
  }
}