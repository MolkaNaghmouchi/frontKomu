import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit, OnDestroy {
    form: any = {
        email: null,
        password: null,
    };
    roles: string[] = [];
    valCheck: string[] = ['remember'];

    password: string;

    config: AppConfig;
    isLoggedIn = false;
    isLoginFailed = false;
    subscription: Subscription;
    errorMessage = '';
    rememberMe: boolean = false;

    constructor(
        public configService: ConfigService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
                this.loadRememberedData();
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit(): void {
        const { username, password } = this.form;

        this.authService.login(username, password).subscribe(
            (data) => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                if (this.rememberMe) {
                    this.rememberData(username, password);
                } else {
                    this.forgetData();
                }
                console.log('Remember Me:', this.rememberMe);
                this.router.navigate(['/app']);
            },
            (error) => {
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    rememberData(username: string, password: string) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
    }

    forgetData() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
    }

    loadRememberedData() {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        this.rememberMe = localStorage.getItem('rememberMe') === 'true';

        if (this.rememberMe && username && password) {
            this.form.username = username;
            this.form.password = password;
        }
    }

    reloadPage(): void {
        window.location.reload();
    }
}
