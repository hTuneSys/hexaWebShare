<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import IconButton from '../buttons/IconButton.svelte';

	/**
	 * Props interface for the FileUpload component
	 */
	interface Props {
		/**
		 * Label text for the file upload
		 */
		label?: string;
		/**
		 * Whether multiple files can be selected
		 * @default false
		 */
		multiple?: boolean;
		/**
		 * Accepted file types (MIME types or extensions)
		 * Example: "image/*", ".pdf,.doc", "image/png,image/jpeg"
		 */
		accept?: string;
		/**
		 * Maximum file size in bytes
		 */
		maxSize?: number;
		/**
		 * Maximum number of files allowed (when multiple is true)
		 */
		maxFiles?: number;
		/**
		 * Whether the file upload is disabled
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the file upload is required
		 * @default false
		 */
		required?: boolean;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Helper text or description
		 */
		helpText?: string;
		/**
		 * Size variant of the file upload
		 * @default 'md'
		 */
		size?: 'xs' | 'sm' | 'md' | 'lg';
		/**
		 * Color variant of the file upload
		 * @default undefined (default DaisyUI style)
		 */
		variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/**
		 * Whether to show file preview
		 * @default true
		 */
		showPreview?: boolean;
		/**
		 * Whether drag and drop is enabled
		 * @default true
		 */
		dragDrop?: boolean;
		/**
		 * Whether the file upload is in loading state
		 * @default false
		 */
		loading?: boolean;
		/**
		 * HTML id attribute
		 */
		id?: string;
		/**
		 * HTML name attribute for form submission
		 */
		name?: string;
		/**
		 * Accessible label for screen readers
		 */
		ariaLabel?: string;
		/**
		 * ARIA describedby attribute
		 */
		ariaDescribedby?: string;
		/**
		 * Change event handler - receives FileList
		 */
		onchange?: (event: Event) => void;
		/**
		 * File selection event handler - receives array of File objects
		 */
		onfiles?: (files: File[]) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	const {
		label,
		multiple = false,
		accept,
		maxSize,
		maxFiles,
		disabled = false,
		required = false,
		error,
		helpText,
		size = 'md',
		variant,
		showPreview = true,
		dragDrop = true,
		loading = false,
		id,
		name,
		ariaLabel,
		ariaDescribedby,
		onchange,
		onfiles,
		class: className = '',
		...props
	}: Props = $props();

	// Generate unique ID if not provided
	let fieldId = $derived(id || `file-upload-${Math.random().toString(36).slice(2, 11)}`);

	// State for selected files
	let selectedFiles = $state<File[]>([]);
	let isDragging = $state(false);
	let inputRef: HTMLInputElement | undefined = $state();

	// File upload container classes
	let containerClasses = $derived(['form-control', 'w-full', className].filter(Boolean).join(' '));

	// Label classes
	let labelClasses = $derived(
		[
			'label',
			size === 'xs' && 'py-0',
			size === 'sm' && 'py-1',
			size === 'md' && 'py-2',
			size === 'lg' && 'py-3'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Upload area classes
	let uploadAreaClasses = $derived(
		[
			'border-2',
			'border-dashed',
			'rounded-lg',
			'p-6',
			'text-center',
			'transition-all',
			'duration-200',
			'cursor-pointer',
			disabled && 'opacity-50',
			disabled && 'cursor-not-allowed',
			isDragging && !disabled && 'border-primary',
			isDragging && !disabled && 'bg-primary/10',
			!isDragging && !disabled && 'border-base-300',
			!isDragging && !disabled && 'hover:border-primary',
			!isDragging && !disabled && 'hover:bg-base-200',
			error !== undefined && error !== '' && 'border-error',
			variant === 'primary' && !isDragging && 'border-primary',
			variant === 'secondary' && !isDragging && 'border-secondary',
			variant === 'accent' && !isDragging && 'border-accent',
			variant === 'info' && !isDragging && 'border-info',
			variant === 'success' && !isDragging && 'border-success',
			variant === 'warning' && !isDragging && 'border-warning',
			variant === 'error' && !isDragging && 'border-error',
			size === 'xs' && 'p-2',
			size === 'sm' && 'p-4',
			size === 'md' && 'p-6',
			size === 'lg' && 'p-8'
		]
			.filter(Boolean)
			.join(' ')
	);

	// Loading spinner size classes
	let loadingSizeClass = $derived(
		size === 'xs'
			? 'loading-xs'
			: size === 'sm'
				? 'loading-sm'
				: size === 'lg'
					? 'loading-lg'
					: 'loading-md'
	);

	// Format file size
	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	}

	// Validate files
	function validateFiles(files: File[]): { valid: boolean; error?: string } {
		if (maxFiles && files.length > maxFiles) {
			return {
				valid: false,
				error: `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`
			};
		}

		if (maxSize) {
			for (const file of files) {
				if (file.size > maxSize) {
					return {
						valid: false,
						error: `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`
					};
				}
			}
		}

		return { valid: true };
	}

	// Handle file selection
	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const files = Array.from(target.files);

		// If not multiple, only keep the first file
		const filesToProcess = multiple ? files : [files[0]];

		// Validate files
		const validation = validateFiles(filesToProcess);
		if (!validation.valid) {
			// Reset input
			if (inputRef) {
				inputRef.value = '';
			}
			selectedFiles = [];
			return;
		}

		// Update selected files
		if (multiple) {
			selectedFiles = [...selectedFiles, ...filesToProcess];
		} else {
			selectedFiles = filesToProcess;
		}

		// Call event handlers
		if (onchange) {
			onchange(event);
		}
		if (onfiles) {
			onfiles(selectedFiles);
		}
	}

	// Handle drag and drop
	function handleDragOver(event: DragEvent) {
		if (!dragDrop || disabled) return;
		event.preventDefault();
		event.stopPropagation();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		if (!dragDrop || disabled) return;
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		if (!dragDrop || disabled) return;
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;

		const files = event.dataTransfer?.files;
		if (!files || files.length === 0) return;

		const fileArray = Array.from(files);
		const filesToProcess = multiple ? fileArray : [fileArray[0]];

		// Validate files
		const validation = validateFiles(filesToProcess);
		if (!validation.valid) {
			return;
		}

		// Update selected files
		if (multiple) {
			selectedFiles = [...selectedFiles, ...filesToProcess];
		} else {
			selectedFiles = filesToProcess;
		}

		// Create a synthetic event for onchange
		if (onfiles) {
			onfiles(selectedFiles);
		}
	}

	// Remove file
	function removeFile(index: number) {
		selectedFiles = selectedFiles.filter((_, i) => i !== index);
		if (onfiles) {
			onfiles(selectedFiles);
		}
		// Reset input if no files remain
		if (selectedFiles.length === 0 && inputRef) {
			inputRef.value = '';
		}
	}

	// Clear all files
	function clearAll() {
		selectedFiles = [];
		if (onfiles) {
			onfiles([]);
		}
		if (inputRef) {
			inputRef.value = '';
		}
	}

	// Trigger file input click
	function triggerFileInput() {
		if (!disabled && inputRef) {
			inputRef.click();
		}
	}
</script>

<div class={containerClasses}>
	{#if label}
		<label for={fieldId} class={labelClasses}>
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-error ml-1" aria-label="required">*</span>
				{/if}
			</span>
		</label>
	{/if}

	<input
		type="file"
		id={fieldId}
		{name}
		{multiple}
		{accept}
		{disabled}
		{required}
		class="hidden"
		aria-label={ariaLabel || (label ? undefined : 'File upload')}
		aria-describedby={ariaDescribedby}
		aria-invalid={error !== undefined && error !== '' ? 'true' : undefined}
		aria-required={required}
		aria-disabled={disabled}
		aria-busy={loading}
		bind:this={inputRef}
		onchange={handleFileSelect}
		{...props}
	/>

	<div
		class={uploadAreaClasses}
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-label={ariaLabel || 'File upload area'}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
		onclick={triggerFileInput}
		onkeydown={(e) => {
			if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
				e.preventDefault();
				triggerFileInput();
			}
		}}
	>
		{#if loading}
			<div class="flex flex-col items-center justify-center gap-2">
				<span class="loading loading-spinner {loadingSizeClass} text-primary" aria-hidden="true"
				></span>
				<span class="text-base-content/70 text-sm">Uploading...</span>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-base-content/50 h-12 w-12"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
					/>
				</svg>
				<div class="text-base-content text-sm font-medium">
					{#if dragDrop}
						Drag and drop files here, or
					{/if}
					<span
						onclick={(e) => {
							e.stopPropagation();
						}}
					>
						<Button
							label="browse"
							variant={variant || undefined}
							{size}
							outline={!variant}
							{disabled}
							onclick={() => {
								triggerFileInput();
							}}
						/>
					</span>
				</div>
				{#if helpText && (!error || error === '')}
					<p class="text-base-content/70 text-xs">{helpText}</p>
				{/if}
				{#if accept}
					<p class="text-base-content/50 text-xs">Accepted: {accept}</p>
				{/if}
				{#if maxSize}
					<p class="text-base-content/50 text-xs">Max size: {formatFileSize(maxSize)}</p>
				{/if}
			</div>
		{/if}
	</div>

	{#if showPreview && selectedFiles.length > 0}
		<div class="mt-4 space-y-2">
			<div class="flex items-center justify-between">
				<span class="text-base-content text-sm font-medium">
					{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
				</span>
				{#if multiple && selectedFiles.length > 1}
					<Button label="Clear all" variant="ghost" size="xs" {disabled} onclick={clearAll} />
				{/if}
			</div>
			<div class="space-y-2">
				{#each selectedFiles as file, index}
					<div
						class="border-base-300 bg-base-100 flex items-center justify-between rounded-lg border p-3"
					>
						<div class="min-w-0 flex-1">
							<p class="text-base-content truncate text-sm font-medium">{file.name}</p>
							<p class="text-base-content/70 text-xs">{formatFileSize(file.size)}</p>
						</div>
						<span class="ml-2">
							<IconButton
								variant="ghost"
								size="xs"
								ariaLabel="Remove file"
								{disabled}
								onclick={() => removeFile(index)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</IconButton>
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if error && error !== ''}
		<div class={labelClasses}>
			<span class="label-text-alt text-error" role="alert" aria-live="polite">{error}</span>
		</div>
	{/if}

	{#if helpText && (!error || error === '') && (!showPreview || selectedFiles.length === 0)}
		<div class={labelClasses}>
			<span class="label-text-alt text-base-content/70">{helpText}</span>
		</div>
	{/if}
</div>
