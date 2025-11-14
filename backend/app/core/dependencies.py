from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import Optional
from .database import get_db
from .security import decode_access_token
from ..models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)

# Development mode: Disable authentication
DEV_MODE_AUTH_DISABLED = True


async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Get the current authenticated user from JWT token (or mock user in dev mode)"""

    # DEV MODE: Return mock test user
    if DEV_MODE_AUTH_DISABLED:
        user = db.query(User).filter(User.email == "test@example.com").first()
        if not user:
            # Create test user if it doesn't exist
            user = User(
                email="test@example.com",
                full_name="Test User",
                hashed_password="not-used-in-dev",
                is_active=True
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    # PRODUCTION MODE: Validate JWT token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if token is None:
        raise credentials_exception

    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception

    email: Optional[str] = payload.get("sub")
    if email is None:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get the current active user"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
