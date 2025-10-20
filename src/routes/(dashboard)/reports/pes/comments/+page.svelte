<script lang="ts">
	let { data } = $props();
	$inspect(data);
</script>

<h1 class="h2">Patient Experience Survey: Comments</h1>

{#if data.vm?.table}
	<div>
		<h1 class="mt-4 h4">All comments ({data.vm.table.rows.length})</h1>
		<div class="mt-3 table-wrap">
			<table class="table caption-bottom">
				<caption class="pt-4"
					>A list of recent visitation data sent from Omnisol on patient discharge.</caption
				>

				<thead>
					<tr>
						{#each data.vm.table.cols as col}
							<th>{col}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="[&>tr]:hover:preset-tonal-primary">
					{#each data.vm.table.rows as r}
						<tr>
							{#each Object.entries(r) as [, val]}
								<td>{val}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
