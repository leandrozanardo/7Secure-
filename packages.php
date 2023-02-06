<!DOCTYPE html>
<html lang="pt-br">

<?php include('head.php'); ?>

<body id="page-top">

    <!-- Page Wrapper -->
    <main id="wrapper">

        <?php include('sidebar.php'); ?>

        <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">

                <?php include('navbar.php'); ?>

                <section id="packages">

                    <?php include('packages_list.php'); ?>

                </section>

            </div>

            <?php include('footer.php'); ?>

        </div>

    </main>

    <?php include('modal.php'); ?>

    <?php include('default_scripts.php'); ?>

    <script src="scripts/packages_api.js"></script>

</body>

</html>