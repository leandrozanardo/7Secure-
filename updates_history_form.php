<section id="updates-history-form">
    <div class="row">
        <div class="col">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Editar Package</h6>
                </div>
                <div class="card-body">
                    <form action="scripts/updates_history_api.js" method="POST" onsubmit="event.preventDefault(); determineRequestType();">

                        <div class="row">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="uuid">UUID</label>
                                    <input type="text" class="form-control" id="uuid" name="uuid" aria-describedby="UUID" placeholder="uuid" disabled>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <input type="text" class="form-control" id="status" name="status" aria-describedby="status" placeholder="0">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="result">Result</label>
                                    <input type="text" class="form-control" id="result" name="result" aria-describedby="result" placeholder="0">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="form-group">
                                    <label for="progress">Progress</label>
                                    <input type="text" class="form-control" id="progress" name="progress" aria-describedby="progress" placeholder="0">
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
                                <input class="btn btn-primary float-right mt-2" type="submit" value="Salvar" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</section>