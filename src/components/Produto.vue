<template>
  <b-container fluid>
    <b-form @submit="salvar" @reset="onReset">
      <b-alert v-show="sucesso" show variant="primary">Operação Realizada com Sucesso!</b-alert>
      <b-alert v-show="erro" show variant="danger">{{msgErro}}</b-alert>
      <b-row>
        <b-col lg="6" md="6" sm="12">
          <b-row>
            <b-col>
              <b-form-group id="produto"
                            label="Nome do Produto:"
                            label-for="produtoInput">
                <b-form-input id="produtoInput" sm="5"
                              type="text"
                              v-model="produto.nome"
                              required
                              placeholder="Digite o nome do produto">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group id="preco"
                            label="Preço do Produto:"
                            label-for="precoInput">
                <b-form-input id="precoInput"
                              type="number"
                              v-model="produto.preco"
                              required
                              placeholder="Digite o Preço">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
  const items = [];

  export default {
    name: "produto",
    data() {
      return {
        msgErro: '',
        produto: {
          nome: '',
          preco: ''
        },
        sucesso: false,
        erro: false,
        items: items,
        fields: [
          {key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc'},
          {key: 'age', label: 'Person age', sortable: true, 'class': 'text-center'},
          {key: 'isActive', label: 'is Active'},
          {key: 'actions', label: 'Actions'}
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: items.length,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        modalInfo: {title: '', content: ''}
      }
    },
    methods: {
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.produto.nome = '';
        this.produto.preco = '';
        this.sucesso = false;
      },
      salvar(evt) {
        evt.preventDefault();
        this.$http.post('http://localhost:8081/produtos', this.produto).then(response => {
          this.sucesso = true;
        }, response => {
          this.msgErro = response.body.msg;
          this.erro = true;
        });
      },
      info(item, index, button) {
        this.modalInfo.title = 'Row index: ${index}';
        this.modalInfo.content = JSON.stringify(item, null, 2);
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      resetModal() {
        this.modalInfo.title = '';
        this.modalInfo.content = '';
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      }
    }
  }
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
