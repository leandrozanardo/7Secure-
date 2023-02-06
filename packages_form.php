<section id="package-form">
    <div class="row">
        <div class="col">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Editar Package</h6>
                </div>
                <div class="card-body">
                    <form action="scripts/packages_api.js" method="POST" onsubmit="event.preventDefault(); determineRequestType();">

                        <div class="row">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="uuid">UUID</label>
                                    <input type="text" class="form-control" id="uuid" name="uuid" aria-describedby="uuid" placeholder="UUID" disabled>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" name="name" aria-describedby="name" placeholder="Name" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="version">Version</label>
                                    <input type="text" class="form-control" id="version" name="version" aria-describedby="version" placeholder="0.0" required>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-12">
                                <input class="btn btn-primary float-right mt-2" type="submit" value="Salvar" />
                                <a href="packages.php" target="_self" class="btn btn-link float-right mt-2">Cancelar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</section>