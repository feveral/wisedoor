<template>
  <div id="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a class="navbar-brand" href="#">智慧門鎖</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="modal" data-target="#login-modal">登入</a>
                </li>
            </ul>
        </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Header'
}
</script>

<style>
#header {
   box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
</style>
