<section id="host-form">
    <div class="row">
        <div class="col">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Editar Host</h6>
                </div>
                <div class="card-body">
                    <form action="scripts/hosts_api.js" method="POST" onsubmit="event.preventDefault(); determineRequestType();">

                        <div class="row">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="hostname">Hostname</label>
                                    <input type="text" class="form-control" id="hostname" name="hostname" aria-describedby="hostname" placeholder="Hostname" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input type="text" class="form-control" id="description" name="description" aria-describedby="description" placeholder="Description">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="ipv4">Ipv4</label>
                                    <input type="text" class="form-control" id="ipv4" name="ipv4" aria-describedby="ipv4" placeholder="0.0.0.0" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="ipv6">Ipv6</label>
                                    <input type="text" class="form-control" id="ipv6" name="ipv6" aria-describedby="ipv6" placeholder="0.0.0.0">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="macaddress">Mac Address</label>
                                    <input type="text" class="form-control" id="macaddress" name="macaddress" aria-describedby="macaddress" placeholder="aa:bb:cc:dd:ee:ff" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="packages">Packages</label>
                                    <input type="text" class="form-control" id="packages" name="packages" aria-describedby="packages" placeholder="0">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="packages_hold">Packages Hold</label>
                                    <input type="text" class="form-control" id="packages_hold" name="packages_hold" aria-describedby="packages_hold" placeholder="0">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="packages_upgradable">Packages Upgradable</label>
                                    <input type="text" class="form-control" id="packages_upgradable" name="packages_upgradable" aria-describedby="packages_upgradable" placeholder="0">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="uuid">UUID</label>
                                    <input type="text" class="form-control" id="uuid" name="uuid" aria-describedby="uuid" placeholder="UUID" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <input class="btn btn-primary float-right mt-2" type="submit" value="Salvar" />
                                <a href="hosts.php" target="_self" class="btn btn-link float-right mt-2"> Cancelar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</section>