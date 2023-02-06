<div id="hosts-list" class="container-fluid">

    <h1 class="h3 mb-2 text-gray-800">Hosts</h1>

    <hr />

    <h2 class="h3 mb-2 text-gray-800 mb-3">Cadastrar Host</h2>

    <div class="row">
        <div class="col">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Cadastre um novo Host</h6>
                </div>
                <div class="card-body">

                    <form action="scripts/hosts_api.js" method="POST" onsubmit="event.preventDefault(); postHost();">

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
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <input class="btn btn-primary float-right mt-2" type="submit" value="Cadastrar">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <hr />

    <h2 class="h3 mb-2 text-gray-800">Hosts Cadastrados</h2>

    <p class="mb-4">Confira abaixo a listagem completa de Hosts disponíveis.</p>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Listagem de Hosts</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>hostname</th>
                            <th>description</th>
                            <th>ipv4</th>
                            <th>ipv6</th>
                            <th>macaddress</th>
                            <th>packages</th>
                            <th>packages_hold</th>
                            <th>packages_upgradable</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>uuid</th>
                            <th>ações</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>id</th>
                            <th>hostname</th>
                            <th>description</th>
                            <th>ipv4</th>
                            <th>ipv6</th>
                            <th>macaddress</th>
                            <th>packages</th>
                            <th>packages_hold</th>
                            <th>packages_upgradable</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>uuid</th>
                            <th>ações</th>
                        </tr>
                    </tfoot>
                    <tbody id="tbl-hosts-body">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- Modal Deletar -->
<div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-gradient-danger">
                <h5 class="modal-title text-white" id="modalDeleteLabel">Deletar Host</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h4 class="text-center"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Tem certeza que deseja deletar esse host?</h4>
                <h5 class="text-center">Essa ação não poderá ser desfeita!</h5>
                 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal"><i class="fa-solid fa-xmark mr-2"></i>Cancelar</button>
                <button type="button" id="btnDelete" class="btn btn-danger" onclick="deleteHost()"><i class="fa-solid fa-trash mr-2"></i>Excluir</button>
            </div>
        </div>
    </div>
</div>