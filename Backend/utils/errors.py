from fastapi import FastAPI, status
from fastapi.responses import JSONResponse

class RentalysisError(Exception):
    """Base error for all Rentalysis exceptions"""
    pass

class UserAlreadyExists(RentalysisError):
    """Raised when a user with the same email already exists"""
    pass

class InvalidCredentials(RentalysisError):
    """Raised when login credentials are incorrect"""
    pass

class UserNotFound(RentalysisError):
    """Raised when a user is not found"""
    pass

class PasswordDoNotMatch(RentalysisError):
    """Raised when password and confirm password do not match"""
    pass

class WeakPassword(RentalysisError):
    """Raised when password is weak"""
    pass

class InvalidMobileNumber(RentalysisError):
    """Raised when mobile number is invalid"""
    pass

class InvalidUsername(RentalysisError):
    """Raised when username is invalid"""
    pass

class InvalidGSTIN(RentalysisError):
    """Raised when GSTIN is invalid"""
    pass
class InvalidToken(RentalysisError):
    """User has provided an invalid or expired token"""
    pass



class RevokeToken(RentalysisError):
    """User has provided token that has been revoked"""
    pass


class AccessTokenRequired(RentalysisError):
    """User has provided a refresh token when an access token is needed"""
    pass


class RefreshTokenRequired(RentalysisError):
    """User has provided an acces token when a refresh token is needed"""
    pass

class UserAlreadyExists(RentalysisError):
    """User has provided an email for a user who exists during sign up"""
    pass

class TagAlreadyExists(RentalysisError):
    """Tag already exists"""
    pass

class InSufficientPermission(RentalysisError):
    """User does not have the necessay permissions to perform an action."""
    pass

class BookNotFound(RentalysisError):
    """Book not found"""
    pass

class UserNotFound(RentalysisError):
    """User not found"""
    pass

class ProductNotFound(RentalysisError):
    """Product not found"""
    pass

class ReviewNotFound(RentalysisError):
    """Review not found"""
    pass
class InvalidReviewCredentials(RentalysisError):
    """Review can't be deleted"""
    pass

class InvalidCredentials(RentalysisError):
    """User has provied wrong email or password during login"""
    pass

class SomethingWentWrong(RentalysisError):
    """Something wne twrong"""
    pass

class AccountNotVerified(RentalysisError):
    """Account not yet verified"""
    pass

def create_exception_handler(status_code: int, initial_detail: dict):
    async def exception_handler(request, exc):
        return JSONResponse(content=initial_detail, status_code=status_code)
    return exception_handler

def register_all_errors(app: FastAPI):
    # --- Auth & User Errors ---
    app.add_exception_handler(
        InvalidCredentials,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "Invalid Email or Password",
                "error_code": "invalid_email_or_password",
            },
        ),
    )

    app.add_exception_handler(
        UserNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "User not found",
                "error_code": "user_not_found",
            },
        ),
    )

    app.add_exception_handler(
        UserAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_409_CONFLICT,
            initial_detail={
                "message": "User with this email already exists",
                "error_code": "user_already_exists",
            },
        ),
    )

    # --- Token & Security Errors ---
    app.add_exception_handler(
        InvalidToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "Token is invalid or expired",
                "error_code": "invalid_token",
            },
        ),
    )

    app.add_exception_handler(
        RevokeToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "Token has been revoked",
                "error_code": "token_revoked",
            },
        ),
    )

    app.add_exception_handler(
        AccessTokenRequired,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={"message": "Access token required", "error_code": "access_token_required"},
        ),
    )

    app.add_exception_handler(
        RefreshTokenRequired,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={"message": "Refresh token required", "error_code": "refresh_token_required"},
        ),
    )

    app.add_exception_handler(
        InSufficientPermission,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={
                "message": "You do not have permission to perform this action",
                "error_code": "insufficient_permissions",
            },
        ),
    )

    # --- Validation Errors ---
    app.add_exception_handler(
        PasswordDoNotMatch,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail={"message": "Passwords do not match", "error_code": "password_mismatch"},
        ),
    )

    app.add_exception_handler(
        WeakPassword,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail={"message": "Password is too weak", "error_code": "weak_password"},
        ),
    )

    app.add_exception_handler(
        InvalidMobileNumber,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail={"message": "Invalid mobile number", "error_code": "invalid_mobile_number"},
        ),
    )

    app.add_exception_handler(
        InvalidUsername,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail={"message": "Invalid username", "error_code": "invalid_username"},
        ),
    )

    app.add_exception_handler(
        InvalidGSTIN,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail={"message": "Invalid GSTIN format", "error_code": "invalid_gstin"},
        ),
    )

    # --- Resource Errors (Books, Tags, Reviews) ---
    app.add_exception_handler(
        BookNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={"message": "Book not found", "error_code": "book_not_found"},
        ),
    )

    app.add_exception_handler(
        ProductNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={"message": "Product not found", "error_code": "product_not_found"},
        ),
    )

    app.add_exception_handler(
        TagAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_409_CONFLICT,
            initial_detail={"message": "Tag already exists", "error_code": "tag_already_exists"},
        ),
    )

    app.add_exception_handler(
        ReviewNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={"message": "Review not found", "error_code": "review_not_found"},
        ),
    )

    app.add_exception_handler(
        InvalidReviewCredentials,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={"message": "You cannot delete/edit this review", "error_code": "invalid_review_access"},
        ),
    )

    # --- System Errors ---
    app.add_exception_handler(
        AccountNotVerified,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={"message": "Account not yet verified", "error_code": "account_not_verified"},
        ),
    )

    app.add_exception_handler(
        SomethingWentWrong,
        create_exception_handler(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            initial_detail={"message": "Something went wrong", "error_code": "server_error"},
        ),
    )
