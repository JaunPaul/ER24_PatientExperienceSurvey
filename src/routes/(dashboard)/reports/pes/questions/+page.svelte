<script lang="ts">
	let { data } = $props();
</script>

<div class="space-y-8 p-4">
	<h1 class="h2">Question Responses</h1>

	{#each data.questions as question}
    {#if question.responses.length > 0}
    <div class="card p-4 space-y-4">
        <h3 class="h3">{question.text}</h3>
				<div class="table-container">
					<table class="table table-hover">
						<thead>
							<tr>
								<th>Response</th>
								<th>Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{#each question.responses as response}
								<tr>
									<td>{response.text}</td>
									<td>{response.createdAt ? new Date(response.createdAt).toLocaleString() : '-'}</td>
									<td>
										{#if response.id}
											<a href="/reports/pes/response/{response.id}" class="btn btn-sm variant-filled-primary">View Survey</a>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
		
            </div>
			{/if}
	{/each}
</div>
