<div id="packages" class="container-fluid">

    <h1 class="h3 mb-2 text-gray-800">Package</h1>

    <hr />

    <h2 class="h3 mb-2 text-gray-800 mb-3">Cadastrar Package</h2>

    <div class="row">
        <div class="col">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Cadastre um novo Package</h6>
                </div>
                <div class="card-body">
                    <form action="scripts/package_api.js" method="POST" onsubmit="event.preventDefault(); postPackage();">

                        <div class="row">
                            <div class="col-12 col-sm-6 col-lg-6">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" name="name" aria-describedby="name" placeholder="Name" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-6">
                                <div class="form-group">
                                    <label for="version">Version</label>
                                    <input type="text" class="form-control" id="version" name="version" aria-describedby="version" placeholder="0.0" required>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <input class="btn btn-primary float-right mt-2" type="submit" value="Cadastrar" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <hr />

    <h2 class="h3 mb-2 text-gray-800">packages Cadastrados</h2>

    <p class="mb-4">Confira abaixo a listagem completa de packages disponíveis.</p>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Listagem de Packages</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>uuid</th>
                            <th>version</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>ações</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>uuid</th>
                            <th>version</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>ações</th>
                        </tr>
                    </tfoot>
                    <tbody id="tbl-packages-body">
                        <tr>
                            <td colspan="12">Carregando dados...</td>
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
                <h5 class="modal-title text-white" id="modalDeleteLabel">Deletar Package</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h4 class="text-center"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Tem certeza que deseja deletar esse Package?</h4>
                <h5 class="text-center">Essa ação não poderá ser desfeita!</h5>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal"><i class="fa-solid fa-xmark mr-2"></i>Cancelar</button>
                <button type="button" id="btnDelete" class="btn btn-danger" onclick="deletePackage()"><i class="fa-solid fa-trash mr-2"></i>Excluir</button>
            </div>
        </div>
    </div>
</div>