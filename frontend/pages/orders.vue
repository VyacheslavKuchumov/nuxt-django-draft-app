
<template>
    <v-container fluid class="pa-4">
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" align="center">
                <!-- Hero Card -->
                <v-card elevation="2" class="pa-6" max-width="600">
                    <v-card-title class="text-h3 text-center text-wrap">
                        Добро пожаловать в раздел заказов!
                    </v-card-title>
                    <v-card-text class="text-body-1 text-justify">
                        Здесь вы можете просматривать и управлять заказами.
                    </v-card-text>
                    <!-- v-list для кнопок v-btn с навигацией -->
                    <v-list>
                        <v-list-item>
                            <v-btn to="/" color="primary" width="50%">Назад</v-btn>
                        </v-list-item>


                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

