"""empty message

Revision ID: b16726578d03
Revises: fe45a7e0b661
Create Date: 2024-03-15 17:45:05.654522

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b16726578d03'
down_revision = 'fe45a7e0b661'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers_classes', schema=None) as batch_op:
        batch_op.drop_constraint('trainers_classes_date_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers_classes', schema=None) as batch_op:
        batch_op.create_unique_constraint('trainers_classes_date_key', ['date'])

    # ### end Alembic commands ###