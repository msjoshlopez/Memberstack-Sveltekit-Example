<script lang="ts">
    import { 
    memberData,
    logoutMember,
    openLoginModal, 
    openSignupModal,
    openProfileModal, 
    openForgotPasswordModal,
    openResetPasswordModal
    } from '../stores/memberstackStore';

    let mobileMenu = false;

    const toggleMenu = () => {
        mobileMenu = !mobileMenu;
    }
</script>

<div id="header">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="menu-icon" class:active={mobileMenu} on:click={toggleMenu}>
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
    </div>
	<div class="logo">
		<a href="/">Memberstack Sveltekit</a>
	</div>
	<nav class:open={mobileMenu}>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li class="dropdown">
				<div>Modals</div>
				<ul>
                    {#if !$memberData}
                        <li><button on:click={openLoginModal}>Login</button></li>
                        <li><button on:click={openSignupModal}>Signup</button></li>
                        <li><button on:click={openForgotPasswordModal}>Forgot Password</button></li>
                        <li><button on:click={openResetPasswordModal}>Reset Password</button></li>
                    {:else}
                        <li><button on:click={openProfileModal}>Profile</button></li>
                    {/if}
				</ul>
			</li>
            {#if !$memberData}
                <li>
                    <a href="/signup">Signup</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
            {:else}
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <button on:click={logoutMember}>Logout</button>
                </li>
            {/if}
		</ul>
	</nav>
</div>

<style>
	#header {
		background: #1e262d;
		width: 100%;
		position: relative;
	}
	#header:after {
		content: '';
		clear: both;
		display: block;
	}
	.logo {
		float: left;
		padding: 26px 0 26px;
	}
	.logo a {
		font-size: 28px;
		display: block;
		padding: 0 0 0 20px;
        text-decoration:none;
        color:#fff
	}
	nav {
		float: right;
	}
	nav > ul {
		float: left;
		position: relative;
	}
	nav li {
		list-style: none;
		float: left;
	}
	nav .dropdown {
		position: relative;
	}
	nav li a, nav li div, nav li button {
		float: left;
		padding: 35px;
		border: none;
        text-decoration:none;
        color:#fff;
        cursor: pointer;
		background-color: transparent;
		font-size: 16px;
		line-height: 24px;
	}
	nav li a:hover, nav li div:hover, nav li button:hover {
		background: #2c3e50;
	}
	nav li ul {
		display: none;
	}
	nav li:hover ul {
		display: inline;
	}
	nav li li {
		float: none;
	}
	nav .dropdown ul {
		position: absolute;
		left: 0;
		top: 100%;
		background: #fff;
		padding: 20px 0;
		border-bottom: 3px solid #34495e;
	}
	nav .dropdown li {
		white-space: nowrap;
	}
	nav .dropdown li a, nav .dropdown li button {
		padding: 10px 35px;
		font-size: 13px;
		min-width: 200px;
	}
	nav li li a, nav li li button {
		float: none;
		color: #333;
		display: block;
		padding: 8px 10px;
		border-radius: 3px;
		font-size: 13px;
		cursor: pointer;
		width: 100%;
		border: none;
		background-color: transparent;
		text-align: left;
	}
	nav li li a:hover, nav li li button:hover {
		background: #bdc3c7;
		background: #fafbfb;
	}
	#menu-icon {
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: -12px;
		margin-right: 30px;
		display: none;
	}
	#menu-icon span {
		border: 2px solid #fff;
		width: 30px;
		margin-bottom: 5px;
		display: block;
		-webkit-transition: all 0.2s;
		transition: all 0.1s;
	}
	@media only screen and (max-width: 1170px) {
		nav > ul > li > a, nav > ul > li > div {
			padding: 35px 15px;
		}
	}
	@media only screen and (min-width: 960px) {
		nav {
			display: block !important;
		}
	}
	@media only screen and (max-width: 959px) {
		nav {
			display: none;
			width: 100%;
			clear: both;
			float: none;
			max-height: 400px;
			overflow-y: scroll;
		}
        nav.open {
            display: block;
        }
		#menu-icon {
			display: inline;
			top: 45px;
			cursor: pointer;
		}
		#menu-icon.active .first {
			transform: rotate(45deg);
			-webkit-transform: rotate(45deg);
			margin-top: 10px;
		}
		#menu-icon.active .second {
			transform: rotate(135deg);
			-webkit-transform: rotate(135deg);
			position: relative;
			top: -9px;
		}
		#menu-icon.active .third {
			display: none;
		}
		nav {
			padding: 10px;
		}
		nav ul {
			float: none;
		}
		nav li {
			float: none;
		}
		nav ul li a, nav ul li div {
			float: none;
			padding: 8px;
			display: block;
		}
		#header nav ul ul {
			display: block;
			position: static;
			background: none;
			border: none;
			padding: 0;
		}
		#header nav a, #header nav button {
			color: #fff;
			padding: 8px;
		}
		#header nav a:hover, #header nav button:hover {
			background: #fff;
			color: #333;
			border-radius: 3px;
		}
		#header nav ul li li a:before, #header nav ul li li button:before {
			content: '- ';
		}
	}
</style>
