<script setup lang="ts">
import { Button, Card, DialogConfirm } from '@fewangsit/wangsvue';
import { ref } from 'vue';

// State untuk berbagai dialog
const showBasicDialog = ref<boolean>(false);
const showSuccessDialog = ref<boolean>(false);
const showDangerDialog = ref<boolean>(false);
const showPrimaryDialog = ref<boolean>(false);
const showCustomIconDialog = ref<boolean>(false);
const showListDialog = ref<boolean>(false);
const showCustomButtonDialog = ref<boolean>(false);
const showNoIconDialog = ref<boolean>(false);
const showCustomFooterDialog = ref<boolean>(false);
const showDisabledConfirmDialog = ref<boolean>(false);

// Data untuk list dialog
const itemsToDelete = [
  'Document 1.pdf',
  'Image 2.jpg',
  'Spreadsheet 3.xlsx',
  'Presentation 4.pptx',
];

/*
 * Data untuk object list demo (akan digunakan di masa depan)
 * const usersToRemove = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
 *   { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
 * ];
 */

// Event handlers
const handleConfirm = (type: string): void => {
  alert(`${type} dialog confirmed!`);
};

const handleClose = (type: string): void => {
  alert(`${type} dialog closed`);
};

const handleCustomAction = (): void => {
  alert('Custom action executed!');
  showCustomFooterDialog.value = false;
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dialog Confirm Demo</h1>

    <p class="text-gray-600 mb-6">
      Demo berbagai customisasi DialogConfirm component dari Wangsvue dengan
      berbagai severity, icon, dan opsi lainnya.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Basic Confirmation -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Basic Confirmation</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog konfirmasi dasar dengan severity danger
            </p>
            <Button
              @click="showBasicDialog = true"
              label="Show Basic Dialog"
              severity="secondary"
            />
          </div>
        </template>
      </Card>

      <!-- Success Dialog -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Success Dialog</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan severity success dan icon success
            </p>
            <Button
              @click="showSuccessDialog = true"
              label="Show Success Dialog"
              severity="success"
            />
          </div>
        </template>
      </Card>

      <!-- Danger Dialog -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Danger Dialog</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan severity danger untuk aksi berbahaya
            </p>
            <Button
              @click="showDangerDialog = true"
              label="Delete Item"
              severity="danger"
            />
          </div>
        </template>
      </Card>

      <!-- Primary Dialog -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Primary Dialog</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan severity primary
            </p>
            <Button
              @click="showPrimaryDialog = true"
              label="Show Primary Dialog"
              severity="primary"
            />
          </div>
        </template>
      </Card>

      <!-- Custom Icon Dialog -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Custom Icon</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan custom header icon
            </p>
            <Button
              @click="showCustomIconDialog = true"
              label="Show Custom Icon"
              severity="secondary"
            />
          </div>
        </template>
      </Card>

      <!-- List Dialog -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">With List</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan daftar item yang akan dihapus
            </p>
            <Button
              @click="showListDialog = true"
              label="Delete Multiple Files"
              severity="danger"
            />
          </div>
        </template>
      </Card>

      <!-- Custom Button Labels -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Custom Button Labels</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan label button yang di-customize
            </p>
            <Button
              @click="showCustomButtonDialog = true"
              label="Save Changes"
              severity="primary"
            />
          </div>
        </template>
      </Card>

      <!-- No Icon Dialog -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">No Icon</h3>
            <p class="text-sm text-gray-600 mb-4">Dialog tanpa icon header</p>
            <Button
              @click="showNoIconDialog = true"
              label="Show No Icon Dialog"
              severity="secondary"
            />
          </div>
        </template>
      </Card>

      <!-- Custom Footer -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Custom Footer</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan custom footer slot
            </p>
            <Button
              @click="showCustomFooterDialog = true"
              label="Show Custom Footer"
              severity="primary"
            />
          </div>
        </template>
      </Card>

      <!-- Disabled Confirm -->
      <Card>
        <template #content>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Disabled Confirm</h3>
            <p class="text-sm text-gray-600 mb-4">
              Dialog dengan tombol confirm yang disabled
            </p>
            <Button
              @click="showDisabledConfirmDialog = true"
              label="Show Disabled Confirm"
              severity="secondary"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Dialog Components -->

    <!-- Basic Dialog -->
    <DialogConfirm
      v-model:visible="showBasicDialog"
      @close="handleClose('Basic')"
      @confirm="handleConfirm('Basic')"
      header="Konfirmasi"
      message="Apakah Anda yakin ingin melanjutkan aksi ini?"
      severity="danger"
    />

    <!-- Success Dialog -->
    <DialogConfirm
      v-model:visible="showSuccessDialog"
      @close="handleClose('Success')"
      @confirm="handleConfirm('Success')"
      close-label="Tetap di Sini"
      confirm-label="Lanjutkan"
      header="Operasi Berhasil"
      message="Data telah berhasil disimpan. Apakah Anda ingin melanjutkan ke halaman berikutnya?"
      severity="success"
    />

    <!-- Danger Dialog -->
    <DialogConfirm
      v-model:visible="showDangerDialog"
      @close="handleClose('Danger')"
      @confirm="handleConfirm('Danger')"
      close-label="Batal"
      confirm-label="Ya, Hapus"
      header="Hapus Item"
      message="Item yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
      severity="danger"
    />

    <!-- Primary Dialog -->
    <DialogConfirm
      v-model:visible="showPrimaryDialog"
      @close="handleClose('Primary')"
      @confirm="handleConfirm('Primary')"
      close-label="Jangan Simpan"
      confirm-button-severity="success"
      confirm-label="Simpan"
      header="Konfirmasi Aksi"
      message="Apakah Anda ingin menyimpan perubahan yang telah dibuat?"
      severity="primary"
    />

    <!-- Custom Icon Dialog -->
    <DialogConfirm
      v-model:visible="showCustomIconDialog"
      @close="handleClose('Custom Icon')"
      @confirm="handleConfirm('Custom Icon')"
      close-label="Ingatkan Lagi"
      confirm-label="Mengerti"
      header="Peringatan Sistem"
      header-icon="error"
      message="Sistem akan melakukan maintenance dalam 5 menit. Simpan pekerjaan Anda sekarang."
      severity="primary"
    />

    <!-- List Dialog -->
    <DialogConfirm
      v-model:visible="showListDialog"
      :list="itemsToDelete"
      @close="handleClose('List')"
      @confirm="handleConfirm('List')"
      close-label="Batal"
      confirm-label="Hapus Semua"
      header="Hapus File"
      message="File berikut akan dihapus secara permanen:"
      severity="danger"
    />

    <!-- Custom Button Dialog -->
    <DialogConfirm
      v-model:visible="showCustomButtonDialog"
      @close="handleClose('Custom Button')"
      @confirm="handleConfirm('Custom Button')"
      close-label="Keluar Tanpa Simpan"
      confirm-label="Simpan & Keluar"
      header="Simpan Perubahan"
      message="Anda memiliki perubahan yang belum disimpan. Apa yang ingin Anda lakukan?"
      severity="primary"
    />

    <!-- No Icon Dialog -->
    <DialogConfirm
      v-model:visible="showNoIconDialog"
      :show-icon="false"
      @close="handleClose('No Icon')"
      @confirm="handleConfirm('No Icon')"
      header="Informasi"
      message="Ini adalah dialog konfirmasi tanpa icon header."
      severity="primary"
    />

    <!-- Custom Footer Dialog -->
    <DialogConfirm
      v-model:visible="showCustomFooterDialog"
      @close="handleClose('Custom Footer')"
      @confirm="handleConfirm('Custom Footer')"
      header="Custom Footer"
      message="Dialog ini menggunakan custom footer dengan multiple actions."
      severity="primary"
    >
      <template #footer>
        <div class="flex justify-end space-x-2 p-4">
          <Button
            @click="handleCustomAction"
            label="Action 1"
            severity="secondary"
          />
          <Button
            @click="handleCustomAction"
            label="Action 2"
            severity="primary"
          />
          <Button
            @click="showCustomFooterDialog = false"
            label="Close"
            severity="danger"
          />
        </div>
      </template>
    </DialogConfirm>

    <!-- Disabled Confirm Dialog -->
    <DialogConfirm
      v-model:visible="showDisabledConfirmDialog"
      @close="handleClose('Disabled')"
      @confirm="handleConfirm('Disabled')"
      close-label="Tutup"
      confirm-label="Tidak Tersedia"
      disable-confirm-button
      header="Aksi Tidak Tersedia"
      message="Tombol konfirmasi dinonaktifkan karena kondisi tertentu tidak terpenuhi."
      severity="primary"
    />
  </div>
</template>
