<script lang="ts">
	let { data } = $props();

	$inspect(data);
</script>

<h1 class="h2">Omnisol responses (recent 20)</h1>
{#if data.vm?.tables && data.vm?.tables.visitationTable}
	<h1 class="mt-4 h2">Visitation events</h1>
	<div class="mt-3 table-wrap">
		<table class="table caption-bottom">
			<caption class="pt-4"
				>A list of recent visitation data sent from Omnisol on patient discharge.</caption
			>

			<thead>
				<tr>
					{#each data.vm.tables.visitationTable.cols as col}
						<th>{col}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="[&>tr]:hover:preset-tonal-primary">
				{#each data.vm.tables.visitationTable.rows as r}
					<tr>
						{#each Object.entries(r) as [, val]}
							<td>{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#if data.vm?.tables && data.vm?.tables.paymentsTable}
	<h1 class="mt-4 h2">Payment events</h1>
	<div class="mt-3 table-wrap">
		<table class="table caption-bottom">
			<caption class="pt-4">A list of recent payments data sent from Omnisol.</caption>

			<thead>
				<tr>
					{#each data.vm.tables.paymentsTable.cols as col}
						<th>{col}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="[&>tr]:hover:preset-tonal-primary">
				{#each data.vm.tables.paymentsTable.rows as r}
					<tr>
						{#each Object.entries(r) as [, val]}
							<td>{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
