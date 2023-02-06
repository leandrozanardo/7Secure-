<!DOCTYPE html>
<html lang="pt-br">

<?php include('head.php'); ?>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <?php include('sidebar.php'); ?>

        <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">

                <?php include('navbar.php'); ?>

                <section id="main">

                    <?php include('dashboard_info.php'); ?>

                </section>

            </div>

            <?php include('footer.php'); ?>
        </div>

    </div>


    <?php include('modal.php'); ?>

    <?php include('default_scripts.php'); ?>

    <script src="scripts/dashboard_api.js"></script>

</body>

</html>