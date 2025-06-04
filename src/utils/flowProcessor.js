// @/utils/flowProcessor.js

/**
 * Aplica todas as operações de um fluxo a um conjunto de dados
 * @param {Object|Array} data Dados de entrada
 * @param {Array} steps Etapas do fluxo a serem aplicadas
 * @returns {Object|Array} Dados processados
 */
export function applyFlowOperations(data, steps) {
  // Clona profundamente os dados de entrada
  let result = JSON.parse(JSON.stringify(data));
  
  // Aplica cada etapa sequencialmente
  for (const step of steps) {
    try {
      switch (step.type) {
        case 'foreach':
          result = applyForEach(result, step);
          break;
        case 'if':
          result = applyCondition(result, step);
          break;
        case 'transform':
          result = applyTransforms(result, step);
          break;
        default:
          console.warn(`Tipo de etapa desconhecido: ${step.type}`);
      }
    } catch (error) {
      console.error(`Erro na etapa ${step.type}:`, error);
      throw new Error(`Falha ao processar etapa: ${step.description} (${error.message})`);
    }
  }
  
  return result;
}

/**
 * Aplica operação forEach (itera sobre um array) ajustes
 * @param {Object|Array} data 
 * @param {Object} step 
 * @returns 
 */
function applyForEach(data, step) {
  if (!step.targetPath) return data;
  
  // Obtém o array para iterar
  const targetArray = getNestedValue(data, step.targetPath);
  
  if (!Array.isArray(targetArray)) {
    throw new Error(`O caminho ${step.targetPath} não aponta para um array`);
  }
  
  // Processa cada item do array
  const processedArray = targetArray.map(item => {
    // Se houver sub-etapas, aplica-as ao item
    if (step.steps && step.steps.length > 0) {
      return applyFlowOperations(item, step.steps);
    }
    return item;
  });
  
  // Atualiza o array no caminho original
  setNestedValue(data, step.targetPath, processedArray);
  return data;
}

/**
 * Aplica operação condicional (if)
 * @param {Object|Array} data 
 * @param {Object} step 
 * @returns 
 */
function applyCondition(data, step) {
  if (!step.conditionPath) return data;
  
  // Para arrays: filtra os itens que atendem à condição
  if (Array.isArray(data)) {
    return data.filter(item => {
      const value = getNestedValue(item, step.conditionPath);
      return evaluateCondition(value, step.conditionOperator, step.conditionValue);
    });
  } 
  // Para objetos: verifica a condição no objeto principal
  else {
    const value = getNestedValue(data, step.conditionPath);
    return evaluateCondition(value, step.conditionOperator, step.conditionValue) ? data : {};
  }
}

/**
 * Aplica transformações
 * @param {Object|Array} data 
 * @param {Object} step 
 * @returns 
 */
function applyTransforms(data, step) {
  if (!step.transforms || step.transforms.length === 0) return data;
  
  // Para arrays: aplica transformações em cada item
  if (Array.isArray(data)) {
    return data.map(item => applyTransformsToItem(item, step.transforms));
  } 
  // Para objetos: aplica transformações no objeto
  else {
    return applyTransformsToItem(data, step.transforms);
  }
}

/**
 * Aplica transformações a um item individual
 * @param {Object} item 
 * @param {Array} transforms 
 * @returns 
 */
function applyTransformsToItem(item, transforms) {
  // Clona o item para evitar mutações indesejadas
  const newItem = { ...item };
  
  for (const transform of transforms) {
    if (!transform.sourcePath || !transform.targetPath) continue;
    
    try {
      // Obtém o valor de origem
      const sourceValue = getNestedValue(newItem, transform.sourcePath);
      
      // Aplica a transformação
      const transformedValue = applyTransform(
        sourceValue, 
        transform.operation, 
        transform.operationValue
      );
      
      // Define o valor transformado no caminho de destino
      setNestedValue(newItem, transform.targetPath, transformedValue);
    } catch (error) {
      console.error(`Erro na transformação: ${transform.sourcePath} -> ${transform.targetPath}`, error);
    }
  }
  
  return newItem;
}

/**
 * Avalia uma condição
 * @param {any} value 
 * @param {string} operator 
 * @param {string} conditionValue 
 * @returns {boolean}
 */
function evaluateCondition(value, operator, conditionValue) {
  // Convertendo para string se necessário
  const strValue = String(value);
  const strCondition = String(conditionValue);
  
  // Convertendo para minúsculas para operações case-insensitive
  const lowerValue = strValue.toLowerCase();
  const lowerCondition = strCondition.toLowerCase();
  
  switch (operator) {
    case '==': 
      return value == conditionValue;
    case '!=': 
      return value != conditionValue;
    case '>': 
      return Number(value) > Number(conditionValue);
    case '<': 
      return Number(value) < Number(conditionValue);
    case '>=': 
      return Number(value) >= Number(conditionValue);
    case '<=': 
      return Number(value) <= Number(conditionValue);
    case 'contains': 
      return lowerValue.includes(lowerCondition);
    case 'regex': 
      try {
        const regex = new RegExp(conditionValue);
        return regex.test(strValue);
      } catch (e) {
        console.error('Expressão regular inválida:', e);
        return false;
      }
    default: 
      return false;
  }
}

/**
 * Aplica uma transformação a um valor
 * @param {any} value 
 * @param {string} operation 
 * @param {any} operationValue (opcional, usado em concat)
 * @returns 
 */
function applyTransform(value, operation, operationValue = null) {
  switch (operation) {
    case 'copy': 
      return value;
    case 'concat': 
      return `${value}${operationValue || ''}`;
    case 'upper': 
      return String(value).toUpperCase();
    case 'lower': 
      return String(value).toLowerCase();
    case 'number': 
      return Number(value) || 0;
    case 'date': 
      return new Date(value).toISOString();
    default: 
      return value;
  }
}

/**
 * Obtém valor aninhado em um objeto
 * @param {Object} obj 
 * @param {string} path 
 * @returns 
 */
function getNestedValue(obj, path) {
  if (!path) return undefined;
  
  return path.split('.').reduce((acc, part) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[part];
  }, obj);
}

/**
 * Define valor aninhado em um objeto
 * @param {Object} obj 
 * @param {string} path 
 * @param {any} value 
 */
function setNestedValue(obj, path, value) {
  if (!path) return;
  
  const parts = path.split('.');
  const last = parts.pop();
  let current = obj;
  
  for (const part of parts) {
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
  
  current[last] = value;
}