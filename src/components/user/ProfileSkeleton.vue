<template>
  <div class="profile-container">
    <div class="container mx-auto p-4 space-y-6 md:pt-8 md:pb-8 md:mt-0 mb-16">
      <!-- Seção Superior (Desktop) -->
      <div class="md:flex md:space-x-6 md:mb-6">
        <!-- Card de Identificação -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:w-1/3">
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-gray-200 animate-pulse mb-4"></div>
            <div class="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>

            <div class="mt-4 flex space-x-2">
              <div class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Estatísticas (Desktop) -->
          <div class="mt-8 grid grid-cols-2 gap-3">
            <div class="bg-gray-100 p-3 rounded-lg">
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
              <div class="h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            <div class="bg-gray-100 p-3 rounded-lg">
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
              <div class="h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>

        <!-- Seção Direita (Desktop) -->
        <div class="md:flex-1 md:space-y-6">
          <!-- Card de Informações Pessoais -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6 md:mt-0">
            <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="i in 4" :key="'personal-'+i">
                <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div class="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Card de Informações Profissionais -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="i in 4" :key="'professional-'+i">
                <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div class="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card de Estatísticas (Mobile) -->
      <div class="md:hidden bg-white rounded-xl shadow-lg p-6">
        <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="i in 4" :key="'mobile-stats-'+i" class="bg-gray-100 p-3 rounded-lg">
            <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div class="h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>

      <!-- Botões de Ação (Mobile) -->
      <div class="md:hidden grid grid-cols-2 gap-3">
        <div v-for="i in 2" :key="'mobile-btn-'+i" class="h-12 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      <!-- Botões de Ação (Desktop) -->
      <div class="hidden md:flex justify-end space-x-4">
        <div v-for="i in 3" :key="'desktop-btn-'+i" class="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSkeleton'
}
</script>