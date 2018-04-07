<template>
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#/">Câmara dos deputados</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item active href="#/">Deputados</b-nav-item>
        <b-nav-item active href="#/camara">Relatório da câmara</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>