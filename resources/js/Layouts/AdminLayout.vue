<template>
<div class="wrapper">

  <!-- Preloader -->
  <!-- <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" :src="'storage/images/AdminLTELogo.png'" alt="AdminLTELogo" height="60" width="60">
  </div> -->

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto align-items-baseline">
      <!-- Team Management -->
      <jet-dropdown id="teamManagementDropdown" v-if="$page.props.jetstream.hasTeamFeatures">
        <template #trigger>
          {{ $page.props.user.current_team.name }}

          <svg class="ml-2" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </template>

        <template #content>
          <!-- Team Management -->
          <template v-if="$page.props.jetstream.hasTeamFeatures">
            <h6 class="dropdown-header">
              Manage Team
            </h6>

            <!-- Team Settings -->
            <jet-dropdown-link :href="route('teams.show', $page.props.user.current_team)">
              Team Settings
            </jet-dropdown-link>

            <jet-dropdown-link :href="route('teams.create')" v-if="$page.props.jetstream.canCreateTeams">
              Create New Team
            </jet-dropdown-link>

            <hr class="dropdown-divider">

            <!-- Team Switcher -->
            <h6 class="dropdown-header">
              Switch Teams
            </h6>

            <template v-for="team in $page.props.user.all_teams" :key="team.id">
              <form @submit.prevent="switchToTeam(team)">
                <jet-dropdown-link as="button">
                  <div class="d-flex">
                    <svg v-if="team.id == $page.props.user.current_team_id" class="mr-1 text-success" width="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ team.name }}</span>
                  </div>
                </jet-dropdown-link>
              </form>
            </template>
          </template>
        </template>
      </jet-dropdown>

      <!-- Authentication Links -->
      <jet-dropdown id="settingsDropdown">
        <template #trigger>
          <img v-if="$page.props.jetstream.managesProfilePhotos" class="rounded-circle" width="32" height="32" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />

          <span v-else>
            {{ $page.props.user.name }}

            <svg class="ml-2" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
        </template>

        <template #content>
          <!-- Account Management -->
          <h6 class="dropdown-header small text-muted">
            Manage Account
          </h6>

          <jet-dropdown-link :href="route('profile.show')">
            Profile
          </jet-dropdown-link>

          <jet-dropdown-link :href="route('api-tokens.index')" v-if="$page.props.jetstream.hasApiFeatures">
            API Tokens
          </jet-dropdown-link>

          <hr class="dropdown-divider">

          <!-- Authentication -->
          <form @submit.prevent="logout">
            <jet-dropdown-link as="button">
              Log out
            </jet-dropdown-link>
          </form>
        </template>
      </jet-dropdown>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <SideBar />

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <slot name="header"></slot>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <slot></slot>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <Footer />

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

</template>

<script>

import JetDropdown from '@/Jetstream/Dropdown'
import JetDropdownLink from '@/Jetstream/DropdownLink'
import CompSideLink from '@/Components/SideLink'
import Footer from '@/Components/Footer'
import SideBar from '@/Components/SideBar'

  export default {
    components: {
      JetDropdown,
      JetDropdownLink,
      CompSideLink,
      Footer,
      SideBar
    },
    methods: {
      switchToTeam(team) {
        this.$inertia.put(route('current-team.update'), {
          'team_id': team.id
        }, {
          preserveState: false
        })
      },

      logout() {
        this.$inertia.post(route('logout'));
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>