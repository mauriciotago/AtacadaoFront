<template>
  <b-form>
    <h1>Categoria</h1>
    <b-alert v-show="sucesso" show variant="primary" dismissible>Cadastrado com sucesso!</b-alert>
    <b-alert v-show="erro" show variant="danger" dismissible>Inválido</b-alert>

    <b-card class="navegador" no-body>
      <b-tabs card>
        <b-tab title="Inserir" @submit="salvar" @reset="onReset">
          <b-form-group
            id="categoria"
            label="Insira uma categoria"
            label-for="inputCategoria"
            :invalid-feedback="invalidFeedback"
            :state="state"
          >
            <b-form-input id="inputCategoria" v-model="categoria.nome" :state="state" trim required
                          class="w-50 mx-auto"></b-form-input>
          </b-form-group>
          <b-button type="submit">Salvar</b-button>
          <b-button type="reset">Cancelar</b-button>
        </b-tab>
        <b-tab title="Buscar" >
          <b-table hover :items="items"></b-table>
        </b-tab>
        <b-tab title="Editar"></b-tab>
        <b-tab title="Excluir"></b-tab>
      </b-tabs>
    </b-card>
  </b-form>
</template>

<script>
  export default {
    data() {
      return {
        categoria: {
          id: '',
          nome: ' '
        },
        nome: ' ',
        sucesso: false,
        erro: false,
        cadastroCategoria: null,
        categoriasCadastradas: [],
        items: [
          {age: 38, first_name: 'Jami', last_name: 'Carney'}
        ]
      }
    },
    created() {
      this.$http.get('http://localhost:9000/categorias').then(response => {
        this.categoriasCadastradas = response.body;
      });
    },
    computed: {
      state() {
        return this.nome.length > 0
      },
      invalidFeedback() {
        if (this.nome.length > 0) {
          return ''
        } else {
          return 'Campo obrigatório.'
        }
      }
    },
    methods: {
      onReset(evt) {
        evt.preventDefault();
        this.sucesso = false;
      },
      salvar(evt) {
        evt.preventDefault();

        this.$http.post('http://localhost:9000/categorias', this.categoria).then(response => {
          this.sucesso = true;
        }, response => {
          alert("erro")
        });
      },
      buscar(evt) {
        evt.preventDefault();

        this.$http.get('http://localhost:9000/categorias').then(response => {

        })
      },
      alterar(evt) {
        evt.preventDefault();
        this.$http.put('http://localhost:9000/categorias', this.categoria).then(response => {

        })
      },
      deletar(evt){
        evt.preventDefault();
        this.$http.delete('http://localhost:9000/categorias').then(response=>{

        })
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style scoped>

</style>
