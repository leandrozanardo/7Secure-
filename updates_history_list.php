<div id="updates-history-list" class="container-fluid">

    <h1 class="h3 mb-2 text-gray-800">Updates History</h1>

    <hr />

    <h2 class="h3 mb-2 text-gray-800 mb-3">Cadastrar Update History</h2>

    <div class="row">
        <div class="col">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Cadastre um novo Update History</h6>
                </div>
                <div class="card-body">

                    <form action="scripts/updates_history_api.js" method="POST" onsubmit="event.preventDefault(); postUpdateHistory();">

                        <div class="row">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <input type="text" class="form-control" id="status" name="status" aria-describedby="status" placeholder="Status">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="result">Result</label>
                                    <input type="text" class="form-control" id="result" name="result" aria-describedby="result" placeholder="Result">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="progress">Progress</label>
                                    <input type="text" class="form-control" id="progress" name="progress" aria-describedby="progress" placeholder="Progress">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="packages_before">Packages Before</label>
                                    <input type="text" class="form-control" id="packages_before" name="packages_before" aria-describedby="packages_before" placeholder="Packages Before">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="packages_after"></label>Packages After</label>
                                    <input type="text" class="form-control" id="packages_after" name="packages_after" aria-describedby="packages_after" placeholder="Packages After">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="packages_diff">Packages Diff</label>
                                    <input type="text" class="form-control" id="packages_diff" name="packages_diff" aria-describedby="packages_diff" placeholder="Packages Diff">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="ansible_log">Ansible Log</label>
                                    <input type="text" class="form-control" id="ansible_log" name="ansible_log" aria-describedby="ansible_log" placeholder="Ansible Log">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="host">Host</label>
                                    <input type="text" class="form-control" id="host" name="host" aria-describedby="host" placeholder="Host" required>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-12">
                                <input class="btn btn-primary float-right mt-2" type="submit" value='Cadastrar' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <hr />

    <h2 class="h3 mb-2 text-gray-800">Updates History Cadastrados</h2>

    <p class="mb-4">Confira abaixo a listagem completa de Updates History disponíveis.</p>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Listagem de Updates History</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>uuid</th>
                            <th>status</th>
                            <th>result</th>
                            <th>progress</th>
                            <th>packages_before</th>
                            <th>packages_after</th>
                            <th>packages_diff</th>
                            <th>ansible_log</th>
                            <th>host</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>ações</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>id</th>
                            <th>uuid</th>
                            <th>status</th>
                            <th>result</th>
                            <th>progress</th>
                            <th>packages_before</th>
                            <th>packages_after</th>
                            <th>packages_diff</th>
                            <th>ansible_log</th>
                            <th>host</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>ações</th>
                        </tr>
                    </tfoot>
                    <tbody id="tbl-updates-history-body">
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
                <h5 class="modal-title text-white" id="modalDeleteLabel">Deletar Update History</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h4 class="text-center"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Tem certeza que deseja deletar esse host?</h4>
                <h5 class="text-center">Essa ação não poderá ser desfeita!</h5>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal"><i class="fa-solid fa-xmark mr-2"></i>Cancelar</button>
                <button type="button" id="btnDelete" class="btn btn-danger" onclick="deleteUpdateHistory()"><i class="fa-solid fa-trash mr-2"></i>Excluir</button>
            </div>
        </div>
    </div>
</div>